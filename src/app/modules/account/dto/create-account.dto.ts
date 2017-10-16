import { ValidateNested } from 'class-validator';
import { CreateOrganizationDto } from './create-organization.dto';
import { CreateUserDto } from './create-user.dto';

export class CreateAccountDto {
    @ValidateNested()
    readonly user: CreateUserDto;
    @ValidateNested()
    readonly organization: CreateOrganizationDto;
}
