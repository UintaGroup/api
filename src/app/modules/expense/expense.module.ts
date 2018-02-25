import { Module, NestModule } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import * as passport from 'passport';
import { CommonModule } from '../common';
import { expenseProviders } from './expense.providers';
import { ExpenseReportController, ExpenseCategoryController } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseCategorySchema, ExpenseReportSchema, ExpenseSchema } from './schema';

@Module({
    imports: [
        CommonModule,
        MongooseModule.forFeature([
            {name: 'Expense', schema: ExpenseSchema},
            {name: 'ExpenseCategory', schema: ExpenseCategorySchema},
            {name: 'ExpenseReport', schema: ExpenseReportSchema},
        ]),
    ],
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