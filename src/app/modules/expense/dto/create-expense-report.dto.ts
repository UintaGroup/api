import { IsDateString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateExpenseDto } from './create-expense.dto';

export class CreateExpenseReportDto {

    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsOptional()
    @ValidateNested()
    expenses: CreateExpenseDto[];
}
