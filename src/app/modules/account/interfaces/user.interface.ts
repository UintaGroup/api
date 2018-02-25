import { Document } from 'mongoose';
import { Organization } from './organization.interface';

export interface User extends Document {
    firstName: string;
    lastName: string;
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

    organization: Organization;
}
