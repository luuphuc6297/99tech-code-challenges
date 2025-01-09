import { appConfig } from '@config/app.config';
import { corsConfig } from '@config/cors.config';
import { databaseConfig } from '@config/database.config';
import { swaggerSpec } from '@config/swagger.config';
import { setupContainer } from '@infrastructure/container';
import { resourceRouter } from '@modules/resource/routes/resource.route';
import { cacheMiddleware } from '@shared/middlewares/cache.middleware';
import { compressionMiddleware } from '@shared/middlewares/compression.middleware';
import { setupSecurityMiddlewares } from '@shared/middlewares/security.middleware';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { Container } from 'typedi';
import { errorHandler } from './shared/errors/error.handler';

export class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupSecurity();
        this.setupDocs();
        this.setupDependencies();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    private setupMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors(appConfig.cors));
        this.app.use(compressionMiddleware);
        this.app.use(cacheMiddleware(300));
    }

    private setupSecurity(): void {
        setupSecurityMiddlewares(this.app);
        this.app.use(cors(corsConfig));
    }

    private setupDocs(): void {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    private setupDependencies(): void {
        setupContainer();
    }

    private setupRoutes(): void {
        this.app.use(
            appConfig.api.prefix + '/resources',
            resourceRouter(Container.get('ResourceController')),
        );
    }

    private setupErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public async start(): Promise<void> {
        try {
            await connect(databaseConfig.url, databaseConfig.options);
            console.log('Connected to MongoDB');

            this.app.listen(appConfig.port, () => {
                console.log(`Server is running on port ${appConfig.port} in ${appConfig.env} mode`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }

    public getServer(): express.Application {
        return this.app;
    }
}
