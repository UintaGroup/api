import { IsEnum } from 'class-validator';
import { ReportStatus } from '../enum';

export class UpdateExpenseReportDto {

    @IsEnum(ReportStatus)
    status: number;
}
