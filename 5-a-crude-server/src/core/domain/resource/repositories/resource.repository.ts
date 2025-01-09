import { ResourceFilters } from '@/modules/resource/dtos';
import { ResourceEntity } from '../entities/resource.entity';

export interface ResourceRepository {
    create(resource: ResourceEntity): Promise<ResourceEntity>;
    findAll(filters: ResourceFilters): Promise<ResourceEntity[]>;
    findById(id: string): Promise<ResourceEntity | null>;
    update(id: string, resource: Partial<ResourceEntity>): Promise<ResourceEntity>;
    delete(id: string): Promise<void>;
}
