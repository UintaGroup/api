import { IsEmail, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;
    @IsNotEmpty()
    public readonly password: string;
}