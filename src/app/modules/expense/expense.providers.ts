import { Connection } from 'mongoose';
import { ExpenseReportService, ExpenseCategoryService } from './services';
import { ExpenseCategorySchema, ExpenseReportSchema } from './schema';

export const expenseProviders = [
    ExpenseReportService,
    ExpenseCategoryService,
    {
        provide: 'ExpenseCategoryModelToken',
        useFactory: (connection: Connection) => connection.model('ExpenseCategory', ExpenseCategorySchema),
        inject: ['DbConnectionToken'],
    },
    {
        provide: 'ExpenseReportModelToken',
        useFactory: (connection: Connection) => connection.model('ExpenseReport', ExpenseReportSchema),
        inject: ['DbConnectionToken'],
    },
];