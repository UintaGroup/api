import { Document } from 'mongoose';
import { IOrganization } from '../../account/interfaces';

export interface IExpenseCategory extends Document {
   name: string;
   description: string;
   organization: string;
   active: boolean;
   sourceSystemId: string;
}