import { Connection } from 'mongoose';
import { ExpenseCategorySchema } from './schema/expense-category.schema';
import { ExpenseCategoryService } from './services/expense-category.service';

export const expenseProviders = [
    ExpenseCategoryService,
    {
        provide: 'ExpenseCategoryModelToken',
        useFactory: (connection: Connection) => connection.model('ExpenseCategory', ExpenseCategorySchema),
        inject: ['DbConnectionToken'],
    },
];