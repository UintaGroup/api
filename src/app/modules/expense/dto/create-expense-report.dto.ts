import 'reflect-metadata';
import { IsDateString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateExpenseDto } from './create-expense.dto';
import { Type } from 'class-transformer';

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
    @Type(() => CreateExpenseDto)
    expenses: CreateExpenseDto[];
}
