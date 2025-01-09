import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Container } from 'typedi';
import { RedisService } from '@/infrastructure/services/redis.service';
import logger from '@shared/utils/logger';

export const cacheMiddleware = (duration: number): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (req.method !== 'GET') {
            next();
            return;
        }

        const redisService = Container.get(RedisService);
        if (!redisService.isReady()) {
            next();
            return;
        }

        const key = `cache:${req.originalUrl}`;

        try {
            const cachedResponse = await redisService.get(key);
            if (cachedResponse) {
                res.json(JSON.parse(cachedResponse));
                return;
            }

            const originalJson = res.json.bind(res);
            res.json = ((body: any) => {
                redisService.set(key, JSON.stringify(body), duration);
                return originalJson(body);
            }) as any;

            next();
        } catch (error) {
            logger.error('Cache Middleware Error:', error);
            next();
        }
    };
};
