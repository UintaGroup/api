import 'reflect-metadata';
import { IsDefined, ValidateNested } from 'class-validator';
import { CreateOrganizationDto } from './create-organization.dto';
import { CreateUserDto } from '../../user/dto';
import { Type } from 'class-transformer';

export class CreateAccountDto {

    @ValidateNested()
    @IsDefined()
    @Type(() => CreateUserDto)
    readonly user: CreateUserDto;

    @ValidateNested()
    @IsDefined()
    @Type(() => CreateOrganizationDto)
    readonly organization: CreateOrganizationDto;
}
