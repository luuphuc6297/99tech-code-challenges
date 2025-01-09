import swaggerJsdoc from 'swagger-jsdoc';
import { appConfig } from './app.config';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Resource API Documentation',
            version: '1.0.0',
            description: 'API documentation for Resource Management',
        },
        servers: [
            {
                url: `http://localhost:${appConfig.port}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/modules/*/routes/*.ts', './src/core/domain/types/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
