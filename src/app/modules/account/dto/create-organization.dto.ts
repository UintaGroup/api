import { IsEmail, IsFQDN, IsNotEmpty, IsOptional, IsUppercase, Length, MinLength } from 'class-validator';

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
    @Length(2)
    @IsUppercase()
    state: string;
    @IsNotEmpty()
    @MinLength(5)
    postalCode: string;
    @IsNotEmpty()
    @Length(3)
    @IsUppercase()
    country: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    phone: string;
    @IsFQDN()
    @IsOptional()
    companySite: string;
}
