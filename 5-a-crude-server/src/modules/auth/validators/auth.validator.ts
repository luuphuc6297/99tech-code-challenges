import { LoginDTO, RegisterDTO } from '@modules/auth/dtos';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const loginSchema = Joi.object<LoginDTO>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const registerSchema = Joi.object<RegisterDTO>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

export const validateAuth = (type: 'login' | 'register') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = type === 'login' ? loginSchema : registerSchema;
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            next(new AppError(ErrorTypes.ValidationError, error));
        }
    };
};
