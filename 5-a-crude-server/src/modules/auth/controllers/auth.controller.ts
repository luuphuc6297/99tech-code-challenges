import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { LoginDTO, RegisterDTO } from '../dtos';
import { UserEntity } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@Service()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data: RegisterDTO = req.body;

            // Hash password
            const hashedPassword = await this.authService.hashPassword(data.password);

            // Create user instance
            const user = new UserEntity(
                'temp-id',
                data.email,
                hashedPassword,
                ['user'],
                new Date(),
                new Date(),
            );

            // Generate token
            const token = this.authService.generateToken(user);

            res.status(201).json({
                user: { id: user.id, email: user.email, roles: user.roles },
                token,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password }: LoginDTO = req.body;

            // Find user (will be implemented with repository)
            const user = new UserEntity(
                'temp-id',
                'test@example.com',
                'hashed-password',
                ['user'],
                new Date(),
                new Date(),
            );

            if (!user) {
                throw new AppError(ErrorTypes.UnauthorizedError, 'Invalid credentials');
            }

            // Verify password
            const isValidPassword = await this.authService.comparePassword(password, user.password);

            if (!isValidPassword) {
                throw new AppError(ErrorTypes.UnauthorizedError, 'Invalid credentials');
            }

            // Generate token
            const token = this.authService.generateToken(user);

            res.json({
                user: { id: user.id, email: user.email, roles: user.roles },
                token,
            });
        } catch (error) {
            next(error);
        }
    }

    async me(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // User is already attached to request by auth middleware
            res.json({ user: req.user });
        } catch (error) {
            next(error);
        }
    }
}
