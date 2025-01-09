import 'module-alias/register';
import 'reflect-metadata';
import { App } from './app';
import { appConfig } from './config/app.config';
import logger from './shared/utils/logger';

const app = new App();
app.start()
    .then(() => {
        const url = `http://localhost:${appConfig.port}`;
        logger.info(`🚀 Application is running on: ${url}`);
        logger.info(`📝 API Documentation available on: ${url}/api/v1/docs`);
        logger.info(`⚡ Environment: ${appConfig.env}`);
        logger.info(`🔌 Database connected to: ${appConfig.database.url}`);
        logger.info(`📦 Redis connected to: ${appConfig.redis.host}:${appConfig.redis.port}`);
    })
    .catch((error: Error) => {
        logger.error('Error starting the application:', error);
        process.exit(1);
    });
