import { User } from '../../user/interfaces';
import { Organization } from './organization.interface';

export interface Account {
    user: User;
    organization: Organization;
}
