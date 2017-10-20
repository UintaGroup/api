import { Document } from 'mongoose';

export interface IExpense extends Document{
    amount: number;
    description: string;
    expenseDate: string;
    expenseCategoryId: string;
    merchant: string;
}
