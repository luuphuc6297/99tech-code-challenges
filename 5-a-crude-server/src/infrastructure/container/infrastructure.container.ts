import { RedisService } from '@infrastructure/services/redis.service';
import { Container } from 'typedi';

export const setupInfrastructureContainer = (): void => {
    Container.set('RedisService', Container.get(RedisService));
};
