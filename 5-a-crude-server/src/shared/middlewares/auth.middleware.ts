import { IAuthService } from '@/modules/auth/services/auth.service';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                roles: string[];
            };
        }
    }
}

export const authenticate = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new AppError(ErrorTypes.UnauthorizedError, 'No token provided');
            }

            const [, token] = authHeader.split(' ');
            const authService = Container.get<IAuthService>('AuthService');
            const decoded = authService.verifyToken(token);

            req.user = decoded;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new AppError(ErrorTypes.UnauthorizedError, 'User not authenticated');
            }

            const hasRole = roles.some((role) => req.user!.roles.includes(role));
            if (!hasRole) {
                throw new AppError(ErrorTypes.ForbiddenError, 'Insufficient permissions');
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
