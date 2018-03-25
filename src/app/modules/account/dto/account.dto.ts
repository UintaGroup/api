import { User } from '../../user/interfaces';
import { Organization } from '../interfaces';

export class AccountDto {
    user: User;
    organization: Organization;
}