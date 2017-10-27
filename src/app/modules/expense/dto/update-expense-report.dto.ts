import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateExpenseReportDto {

    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;
}
