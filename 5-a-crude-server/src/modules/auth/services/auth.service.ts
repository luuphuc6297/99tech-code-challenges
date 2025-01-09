import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';
import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';
import { UserEntity } from '../entities/user.entity';
import bcrypt from 'bcrypt';
import { appConfig } from '@/config/app.config';

export interface IAuthService {
    generateToken(user: UserEntity): string;
    verifyToken(token: string): any;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}

@Service()
export class AuthService implements IAuthService {
    private readonly JWT_SECRET = appConfig.jwt.secret;
    private readonly JWT_EXPIRES_IN = appConfig.jwt.expiresIn;

    public generateToken(user: UserEntity): string {
        return sign({ id: user.id, email: user.email, roles: user.roles }, this.JWT_SECRET, {
            expiresIn: this.JWT_EXPIRES_IN,
        });
    }

    public verifyToken(token: string): any {
        try {
            return verify(token, this.JWT_SECRET);
        } catch (error) {
            throw new AppError(ErrorTypes.UnauthorizedError, 'Invalid token');
        }
    }

    public async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
