import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength, ValidateNested } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @MinLength(6)
    @MaxLength(20)
    readonly password: string;

    readonly facebook: string;
    readonly twitter: string;
    readonly google: string;
    readonly microsoft: string;
}
