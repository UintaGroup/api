import { Component } from '@nestjs/common';
import { CreateAccountDto } from '../dto';
import { UserService } from './user.service';
import { IAccount } from '../interfaces';
import { OrganizationService } from './organization.service';
import { AccountDto } from '../dto';

@Component()
export class AccountService {
    constructor(private readonly userService: UserService, private readonly organizationService: OrganizationService) {
    }

    async create(createAccountDto: CreateAccountDto): Promise<IAccount> {
        const result: IAccount = new AccountDto();
        await this.organizationService.create(createAccountDto.organization)
            .then(org => {
                result.organization = org;
                return this.userService.createAdmin(org, createAccountDto.user);
            })
            .then(user => result.user = user);
        return result;
    }
}
