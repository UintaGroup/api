import { Document } from 'mongoose';
import { Organization } from '../../account/interfaces';

export interface IExpenseCategory extends Document {
   name: string;
   description: string;
   organization: Organization;
   active: boolean;
   sourceSystemId: string;
}