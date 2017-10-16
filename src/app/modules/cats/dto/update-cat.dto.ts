import { IsString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateCatDto {
    constructor(date: any) {
       console.log('DATA', date);
    }

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
