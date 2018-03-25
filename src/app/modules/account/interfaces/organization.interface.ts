import { Document } from 'mongoose';
import { User } from '../../user';

export interface Organization extends Document {
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
    users: User[];
}
