import { Document } from 'mongoose';
import { IExpense } from './expense.interface';
import { User } from '../../user/interfaces';

export interface IExpenseReport extends Document{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    user: User;
    status: number;
    expenses: IExpense[];
}
