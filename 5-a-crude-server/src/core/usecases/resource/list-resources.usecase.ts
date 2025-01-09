import { ResourceEntity } from '@core/domain/resource/entities/resource.entity';
import { ResourceRepository } from '@core/domain/resource/repositories/resource.repository';
import { ResourceFilters } from '@modules/resource/types/resource.types';
import { Service } from 'typedi';

@Service()
export class ListResourcesUseCase {
    constructor(private readonly repository: ResourceRepository) {}

    async execute(filters: ResourceFilters): Promise<ResourceEntity[]> {
        return this.repository.findAll(filters);
    }
}   