import { Document } from 'mongoose';
import { IUser } from './user.interface';

export interface IOrganization extends Document {
    name: string;
    address: string;
    addressTwo: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
    publicKey: string;
    active: boolean;
    companySite: string;
    users: IUser[];
}
