import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => {
            const password = encodeURIComponent(process.env.DB_PASSWORD);
            const user = process.env.DB_USER;
            const authSrc = process.env.DB_AUTH_SOURCE;
            const host = process.env.DB_HOST;
            const connectionString = 'mongodb://' + user + ':' + password + host + authSrc;
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(connectionString, {
                useMongoClient: true,
            });
        },
    },
];