import { IsString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateCatDto {
    @IsString()
    readonly id: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    readonly age: number;

    @IsOptional()
    @IsString()
    readonly breed: string;
}
