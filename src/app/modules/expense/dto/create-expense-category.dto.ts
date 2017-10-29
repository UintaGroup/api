import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExpenseCategoryDto {

    @IsNotEmpty()
    name: string;
    @IsOptional()
    description: string;
    @IsOptional()
    sourceSystemId: string;
}
