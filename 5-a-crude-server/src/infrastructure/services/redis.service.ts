import { appConfig } from '@/config/app.config';
import logger from '@shared/utils/logger';
import { createClient, RedisClientType } from 'redis';
import { Service } from 'typedi';

@Service()
export class RedisService {
    private client: RedisClientType;
    private isConnected: boolean = false;

    constructor() {
        this.client = createClient({
            url: `redis://${appConfig.redis.host}:${appConfig.redis.port}`,
        });

        this.setupEventHandlers();
        this.connect();
    }

    private setupEventHandlers(): void {
        this.client.on('error', (err) => {
            this.isConnected = false;
            logger.error('Redis Client Error', err);
        });

        this.client.on('connect', () => {
            this.isConnected = true;
            logger.info('Redis Client Connected');
        });
    }

    private async connect(): Promise<void> {
        try {
            await this.client.connect();
        } catch (err) {
            logger.error('Redis Connection Error', err);
        }
    }

    public async get(key: string): Promise<string | null> {
        try {
            return await this.client.get(key);
        } catch (error) {
            logger.error('Redis Get Error:', error);
            return null;
        }
    }

    public async set(key: string, value: string, duration?: number): Promise<void> {
        try {
            if (duration) {
                await this.client.setEx(key, duration, value);
            } else {
                await this.client.set(key, value);
            }
        } catch (error) {
            logger.error('Redis Set Error:', error);
        }
    }

    public async delete(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            logger.error('Redis Delete Error:', error);
        }
    }

    public getClient(): RedisClientType {
        return this.client;
    }

    public isReady(): boolean {
        return this.isConnected;
    }
}
