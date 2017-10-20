import { Controller, Get, Post, Body, Req, Param, Put } from '@nestjs/common';
import { ObjectIdPipe } from '../../common/pipes';
import { ExpenseReportService } from '../services';
import { CreateExpenseReportDto, UpdateExpenseReportDto } from '../dto';
import { IExpenseReport } from '../interfaces';

@Controller('expenses/reports')
export class ExpenseReportController {
    constructor(private readonly expenseReportService: ExpenseReportService) {
    }

    @Get()
    public async findAll(@Req() req) {
        return await this.expenseReportService.findAll(req.user);
    }

    @Get(':id')
    public async findOne(@Req() req, @Param('id', new ObjectIdPipe()) id): Promise<IExpenseReport> {
        return await this.expenseReportService.findOne(req.user, id);
    }

    @Post()
    public async create(@Req() req, @Body() createExpenseReportDto: CreateExpenseReportDto): Promise<any> {
        return await this.expenseReportService.create(req.user, createExpenseReportDto);
    }

    @Put(':id')
    public async updateStatus(@Req() req, @Param('id', new ObjectIdPipe()) id,  @Body() updateExpenseReportDto: UpdateExpenseReportDto): Promise<any> {
        return await this.expenseReportService.update(req.user, id, updateExpenseReportDto);
    }
}