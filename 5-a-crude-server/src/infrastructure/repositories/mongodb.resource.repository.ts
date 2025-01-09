import { ResourceEntity } from '@core/domain/resource/entities/resource.entity';
import { ResourceRepository } from '@core/domain/resource/repositories/resource.repository';
import { ResourceDocument, ResourceModel } from '@infrastructure/database/models/resource.model';
import { RedisService } from '@infrastructure/services/redis.service';
import {
    CreateResourceDTO,
    ResourceFilters,
    UpdateResourceDTO,
} from '@modules/resource/types/resource.types';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { logger } from '@shared/logger/logger';
import { Service } from 'typedi';

@Service()
export class MongoDBResourceRepository implements ResourceRepository {
    constructor(private readonly redisService: RedisService) {}

    private async invalidateCache(pattern: string): Promise<void> {
        try {
            const keys = await this.redisService.getClient().keys(pattern);
            if (keys.length > 0) {
                await this.redisService.getClient().del(keys);
            }
        } catch (error) {
            logger.error('Cache Invalidation Error:', error);
        }
    }

    private mapToResource(doc: ResourceDocument): ResourceEntity {
        return new ResourceEntity(
            doc._id.toString(),
            doc.name,
            doc.description,
            doc.createdAt,
            doc.updatedAt,
        );
    }

    async create(data: CreateResourceDTO): Promise<ResourceEntity> {
        try {
            const resource = new ResourceModel(data);
            const savedResource = await resource.save();
            await this.invalidateCache('cache:/api/v1/resources*');
            return this.mapToResource(savedResource);
        } catch (error) {
            throw new AppError(ErrorTypes.DatabaseError, error);
        }
    }

    async findAll(filters: ResourceFilters): Promise<ResourceEntity[]> {
        try {
            const query = ResourceModel.find();

            if (filters.name) {
                query.where('name', new RegExp(filters.name, 'i'));
            }

            if (filters.sortBy) {
                const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
                query.sort({ [filters.sortBy]: sortOrder });
            }

            if (filters.page && filters.limit) {
                const skip = (filters.page - 1) * filters.limit;
                query.skip(skip).limit(filters.limit);
            }

            const resources = await query.exec();
            return resources.map(this.mapToResource);
        } catch (error) {
            throw new AppError(ErrorTypes.DatabaseError, error);
        }
    }

    async findById(id: string): Promise<ResourceEntity | null> {
        try {
            const resource = await ResourceModel.findById(id);
            return resource ? this.mapToResource(resource) : null;
        } catch (error) {
            throw new AppError(ErrorTypes.DatabaseError, error);
        }
    }

    async update(id: string, data: UpdateResourceDTO): Promise<ResourceEntity> {
        try {
            const resource = await ResourceModel.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true },
            );
            if (!resource) {
                throw new AppError(ErrorTypes.ResourceNotFound, { id });
            }
            await this.invalidateCache('cache:/api/v1/resources*');
            return this.mapToResource(resource);
        } catch (error) {
            throw new AppError(ErrorTypes.DatabaseError, error);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const result = await ResourceModel.findByIdAndDelete(id);
            if (!result) {
                throw new AppError(ErrorTypes.ResourceNotFound, { id });
            }
            await this.invalidateCache('cache:/api/v1/resources*');
        } catch (error) {
            throw new AppError(ErrorTypes.DatabaseError, error);
        }
    }
}
