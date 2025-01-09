import { CreateResourceDTO, UpdateResourceDTO } from '@modules/resource/dtos';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const createSchema = Joi.object<CreateResourceDTO>({
    name: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(10).max(500),
});

const updateSchema = Joi.object<UpdateResourceDTO>({
    name: Joi.string().min(3).max(50),
    description: Joi.string().min(10).max(500),
});

const listSchema = Joi.object({
    name: Joi.string(),
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(100),
    sortBy: Joi.string().valid('name', 'createdAt', 'updatedAt'),
    sortOrder: Joi.string().valid('asc', 'desc'),
});

const idSchema = Joi.object({
    id: Joi.string()
        .required()
        .regex(/^[0-9a-fA-F]{24}$/),
});

export const validateResource = (type: 'create' | 'update' | 'list' | 'getById' | 'delete') => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            switch (type) {
                case 'create':
                    await createSchema.validateAsync(req.body);
                    break;
                case 'update':
                    await Promise.all([
                        idSchema.validateAsync({ id: req.params.id }),
                        updateSchema.validateAsync(req.body),
                    ]);
                    break;
                case 'list':
                    await listSchema.validateAsync(req.query);
                    break;
                case 'getById':
                case 'delete':
                    await idSchema.validateAsync({ id: req.params.id });
                    break;
            }
            next();
        } catch (error) {
            next(new AppError(ErrorTypes.ValidationError, error));
        }
    };
};
