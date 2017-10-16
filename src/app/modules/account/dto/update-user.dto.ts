import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {

    @MinLength(6)
    @MaxLength(20)
    @IsOptional()
    readonly password: string;

    @IsOptional()
    // @IsEmail()
    readonly facebook: string;
    @IsOptional()
    readonly twitter: string;
    @IsOptional()
    readonly google: string;
    @IsOptional()
    readonly microsoft: string;
}
