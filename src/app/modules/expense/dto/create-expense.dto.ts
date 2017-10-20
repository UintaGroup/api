import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {

    @IsNumber()
    amount: number;

    @IsOptional()
    description: string;

    @IsDateString()
    expenseDate: string;

    @IsNotEmpty()
    expenseCategoryId: string;

    @IsString()
    merchant: string;

}
