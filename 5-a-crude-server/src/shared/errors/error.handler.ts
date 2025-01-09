import { appConfig } from '@/config/app.config';
import { AppError } from '@shared/errors/app.error';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (error instanceof AppError) {
        res.status(error.status).json({
            error: error.message,
            code: error.code,
            details: error.details,
            ...(error.isPublic && { stack: error.stack }),
        });
        return;
    }

    if (error.name === 'ValidationError') {
        res.status(400).json({
            error: 'Validation Error',
            details: error.message,
        });
        return;
    }

    res.status(500).json({
        error: 'Internal Server Error',
        ...(appConfig.env === 'development' && { stack: error.stack }),
    });
};
