import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountDto } from '../dto';
import { IAccount } from '../interfaces';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    @Post()
    async create(@Body() createAccountDto: CreateAccountDto): Promise<IAccount> {
       return await this.accountService.create(createAccountDto);
    }
}
