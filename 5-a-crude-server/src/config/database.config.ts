import { ConnectOptions } from 'mongoose';
import { appConfig } from './app.config';

export const databaseConfig = {
    url: appConfig.database.url,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    } as ConnectOptions,
};
