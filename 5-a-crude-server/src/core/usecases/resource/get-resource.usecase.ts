import { ResourceEntity } from '@core/domain/resource/entities/resource.entity';
import { ResourceRepository } from '@core/domain/resource/repositories/resource.repository';
import { IResourceService } from '@modules/resource/services/resource.service';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { Inject, Service } from 'typedi';

@Service()
export class GetResourceUseCase {
    constructor(
        private readonly repository: ResourceRepository,
        @Inject('ResourceService')
        private readonly domainService: IResourceService,
    ) {}

    async execute(id: string): Promise<ResourceEntity> {
        const resource = await this.repository.findById(id);
        if (!resource) {
            throw new AppError(ErrorTypes.ResourceNotFound, { id });
        }
        return this.domainService.enrichResourceData(resource);
    }
}
