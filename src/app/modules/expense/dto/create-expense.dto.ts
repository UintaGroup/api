import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateExpenseDto {

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    description: string;

    @IsDateString()
    expenseDate: string;

    @IsNotEmpty()
    @IsMongoId()
    expenseCategoryId: string;

    @IsNotEmpty()
    @IsString()
    merchant: string;

}
