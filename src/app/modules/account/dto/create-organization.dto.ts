import { IsEmail, IsFQDN, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDto {

    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    address: string;
    @IsOptional()
    addressTwo: string;
    @IsNotEmpty()
    city: string;
    @IsNotEmpty()
    state: string;
    @IsNotEmpty()
    postalCode: string;
    @IsNotEmpty()
    country: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    phone: string;
    @IsFQDN()
    companySite: string;
}
