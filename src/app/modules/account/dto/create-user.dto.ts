import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsOptional()
    readonly externalId: string;

    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    readonly password: string;

    @IsOptional()
    readonly facebook: string;
    @IsOptional()
    readonly twitter: string;
    @IsOptional()
    readonly google: string;
    @IsOptional()
    readonly microsoft: string;
}
