import { ResourceRepository } from '@core/domain/resource/repositories/resource.repository';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { Service } from 'typedi';

@Service()
export class DeleteResourceUseCase {
    constructor(private readonly repository: ResourceRepository) {}

    async execute(id: string): Promise<void> {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new AppError(ErrorTypes.ResourceNotFound, { id });
        }

        await this.repository.delete(id);
    }
} 