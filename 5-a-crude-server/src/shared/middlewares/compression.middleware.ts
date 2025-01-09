import compression from 'compression';
import { Request, RequestHandler } from 'express';

export const compressionMiddleware: RequestHandler = compression({
    filter: (req: Request) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, req.res!);
    },
    level: 6,
}); 