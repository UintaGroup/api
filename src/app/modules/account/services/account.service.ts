import { Component, Inject } from '@nestjs/common';
import { CreateAccountDto } from '../dto/create-account.dto';
import { MongoException } from '../../database/exceptions/mongo.exception';
import { UserService } from './user.service';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { IAccount } from '../interfaces/account.interface';

@Component()
export class AccountService {
    constructor(private readonly userService: UserService, private readonly organizationService: OrganizationService) {
    }

    async create(createAccountDto: CreateAccountDto): Promise<IAccount> {
        let result: any = {} as IAccount;
        await this.organizationService.create(createAccountDto.organization)
            .then(org => {
                result.organization = org;
                return this.userService.createAdmin(createAccountDto.user, org.id);
            })
            .then(user => result.user = user);
        return result;
    }
}
