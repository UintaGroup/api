import { Document } from 'mongoose';
import { IExpense } from './expense.interface';
import { IUser } from '../../account/interfaces';

export interface IExpenseReport extends Document{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    user: IUser;
    status: number;
    expenses: IExpense[];
}
