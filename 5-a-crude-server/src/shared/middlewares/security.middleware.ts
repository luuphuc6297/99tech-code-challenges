import { Application } from 'express';
import rateLimit from 'express-rate-limit';
import { body, param, query } from 'express-validator';
import helmet from 'helmet';
import hpp from 'hpp';

export const setupSecurityMiddlewares = (app: Application): void => {
    // Basic security headers
    app.use(helmet());

    // Rate limiting
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            message: 'Too many requests from this IP, please try again later',
        }),
    );

    // Prevent parameter pollution
    app.use(hpp());

    // Global sanitization
    app.use([body().trim().escape(), query().trim().escape(), param().trim().escape()]);

    // Additional security headers
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
};
