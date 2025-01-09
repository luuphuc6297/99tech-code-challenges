import {
    CreateResourceUseCase,
    DeleteResourceUseCase,
    GetResourceUseCase,
    ListResourcesUseCase,
    UpdateResourceUseCase,
} from '@core/usecases/resource';
import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { CreateResourceDTO, ResourceFilters, UpdateResourceDTO } from '../dtos';

@Service()
export class ResourceController {
    constructor(
        @Inject('CreateResourceUseCase') private readonly createUseCase: CreateResourceUseCase,
        @Inject('GetResourceUseCase') private readonly getUseCase: GetResourceUseCase,
        @Inject('UpdateResourceUseCase') private readonly updateUseCase: UpdateResourceUseCase,
        @Inject('DeleteResourceUseCase') private readonly deleteUseCase: DeleteResourceUseCase,
        @Inject('ListResourcesUseCase') private readonly listUseCase: ListResourcesUseCase,
    ) {}

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data: CreateResourceDTO = req.body;
            const resource = await this.createUseCase.execute(data);
            res.status(201).json(resource);
        } catch (error) {
            next(error);
        }
    }

    async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const filters: ResourceFilters = {
                name: req.query.name as string,
                page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
                limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
                sortBy: req.query.sortBy as string,
                sortOrder: req.query.sortOrder as 'asc' | 'desc',
            };
            const resources = await this.listUseCase.execute(filters);
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const resource = await this.getUseCase.execute(req.params.id);
            res.json(resource);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data: UpdateResourceDTO = req.body;
            const resource = await this.updateUseCase.execute(req.params.id, data);
            res.json(resource);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.deleteUseCase.execute(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
