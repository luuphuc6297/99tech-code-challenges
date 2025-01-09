import { UpdateResourceDTO } from '@/modules/resource/dtos';
import { ResourceEntity } from '@core/domain/resource/entities/resource.entity';
import { ResourceRepository } from '@core/domain/resource/repositories/resource.repository';
import { IResourceService } from '@modules/resource/services/resource.service';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { Inject, Service } from 'typedi';

@Service()
export class UpdateResourceUseCase {
    constructor(
        private readonly repository: ResourceRepository,
        @Inject('ResourceService')
        private readonly domainService: IResourceService,
    ) {}

    async execute(id: string, data: UpdateResourceDTO): Promise<ResourceEntity> {
        const existingResource = await this.repository.findById(id);
        if (!existingResource) {
            throw new AppError(ErrorTypes.ResourceNotFound, { id });
        }

        existingResource.update(data.name, data.description);
        this.domainService.validateResource(existingResource);

        const updatedResource = await this.repository.update(id, existingResource);
        return this.domainService.enrichResourceData(updatedResource);
    }
}
