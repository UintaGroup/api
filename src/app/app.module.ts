import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth';
import { AccountModule } from './modules/account';
import { CommonModule } from './modules/common';
import { ExpenseModule } from './modules/expense';

const password = encodeURIComponent(process.env.DB_PASSWORD);
const user = process.env.DB_USER;
const authSrc = process.env.DB_AUTH_SOURCE;
const host = process.env.DB_HOST;

@Module({
    imports: [
        AuthModule,
        AccountModule,
        CommonModule,
        ExpenseModule,
        MongooseModule.forRoot('mongodb://' + user + ':' + password + host + authSrc),
    ],
})
export class ApplicationModule {
}