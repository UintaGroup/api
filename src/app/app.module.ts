import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats';
import { AuthModule } from './modules/auth';
import { AccountModule } from './modules/account';
import { CommonModule } from './modules/common';
import {ExpenseModule} from './modules/expense';

@Module({
    modules: [CatsModule, AuthModule, AccountModule, CommonModule, ExpenseModule],
})
export class ApplicationModule {}