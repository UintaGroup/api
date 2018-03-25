import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {

    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsOptional()
    readonly externalId: string;

    @MinLength(8)
    @MaxLength(20)
    @IsOptional()
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
