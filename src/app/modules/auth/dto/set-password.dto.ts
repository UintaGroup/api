import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SetPasswordDto {

    @MinLength(6)
    @MaxLength(20)
    readonly password: string;

    @IsNotEmpty()
    readonly token: string;
}
