import { IsString, IsInt, IsPositive, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateCatDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    @Max(99)
    readonly age: number;

    @IsString()
    readonly breed: string;
}
