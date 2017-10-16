import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => {
            const password = encodeURIComponent('087P%vKt6*6b');
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect('mongodb://root:' + password + '@axpense-shard-00-00-h1udq.mongodb.net:27017,axpense-shard-00-01-h1udq.mongodb.net:27017,axpense-shard-00-02-h1udq.mongodb.net:27017/test?ssl=true&replicaSet=Axpense-shard-0&authSource=admin', {
                useMongoClient: true,
            });
        },
    },
];