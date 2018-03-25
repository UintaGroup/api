import 'reflect-metadata';
import { IsDateString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { UpdateExpenseDto } from './update-expense.dto';
import { Type } from 'class-transformer';

export class UpdateExpenseReportDto {

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
    @Type(() => UpdateExpenseDto)
    expenses: UpdateExpenseDto[];
}
