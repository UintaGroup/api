import 'reflect-metadata';
import { IsDateString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { UpdateExpenseDto } from './update-expense.dto';
import { Type } from 'class-transformer';

export class UpdateExpenseReportDto {

    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsOptional()
    description: string;

    @IsDateString()
    @IsOptional()
    startDate: string;

    @IsDateString()
    @IsOptional()
    endDate: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateExpenseDto)
    expenses: UpdateExpenseDto[];
}
