import { ResourceEntity } from '@/core/domain/resource/entities/resource.entity';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { Service } from 'typedi';

export interface IResourceService {
    validateResourceName(name: string): boolean;
    validateResource(resource: ResourceEntity): void;
    enrichResourceData(resource: ResourceEntity): Promise<ResourceEntity>;
    validateResourceExists(id: string, resource: ResourceEntity | null): void;
}

@Service()
export class ResourceService implements IResourceService {
    public validateResourceName(name: string): boolean {
        if (name.length < 3 || name.length > 50) {
            throw new AppError(ErrorTypes.ValidationError, 'Invalid resource name length');
        }

        // Add more business validation rules
        const namePattern = /^[a-zA-Z0-9\s-_]+$/;
        if (!namePattern.test(name)) {
            throw new AppError(
                ErrorTypes.ValidationError,
                'Resource name contains invalid characters',
            );
        }

        return true;
    }

    public async enrichResourceData(resource: ResourceEntity): Promise<ResourceEntity> {
        return new ResourceEntity(
            resource.id,
            resource.name,
            resource.description,
            resource.createdAt,
            resource.updatedAt,
            {
                lastModified: new Date(),
                version: this.calculateVersion(resource),
            },
        );
    }

    public validateResourceExists(id: string, resource: ResourceEntity | null): void {
        if (!resource) {
            throw new AppError(ErrorTypes.ResourceNotFound, { id });
        }
    }

    private calculateVersion(resource: ResourceEntity): number {
        // Add version calculation logic
        return 1;
    }

    public validateResource(resource: ResourceEntity): void {
        this.validateResourceName(resource.name);
        // Add additional validation if needed
    }
}
