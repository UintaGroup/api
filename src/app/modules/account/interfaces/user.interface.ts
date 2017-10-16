import { Document } from 'mongoose';
import { IOrganization } from './organization.interface';

export interface IUser extends Document {
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    facebook: string;
    twitter: string;
    google: string;
    microsoft: string;
    roles: string[];
    active: boolean;
    tokens: any[];

    comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
    gravatar: (size: number) => string;

    organization: IOrganization;
}
