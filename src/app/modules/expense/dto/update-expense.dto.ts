import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateExpenseDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    amount: number;

    @IsOptional()
    description: string;

    @IsDateString()
    @IsOptional()
    expenseDate: string;

    @IsNotEmpty()
    @IsMongoId()
    @IsOptional()
    expenseCategoryId: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    merchant: string;

}
