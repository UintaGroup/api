import { Module, NestModule } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import * as passport from 'passport';
import { CommonModule } from '../common';
import { DatabaseModule } from '../database';
import { expenseProviders } from './expense.providers';
import { ExpenseReportController, ExpenseCategoryController } from './controllers';

@Module({
    modules: [CommonModule, DatabaseModule],
    components: [...expenseProviders],
    controllers: [ExpenseReportController, ExpenseCategoryController],
})
export class ExpenseModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes(ExpenseReportController, ExpenseCategoryController);
    }
}