import { IUser } from './user.interface';
import { IOrganization } from './organization.interface';

export interface IAccount {
    user: IUser;
    organization: IOrganization;
}
