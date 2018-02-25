import { User } from './user.interface';
import { Organization } from './organization.interface';

export interface Account {
    user: User;
    organization: Organization;
}
