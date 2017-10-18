import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { ObjectIdPipe } from '../../common/pipes';
import { ExpenseCategoryService } from '../services';
import { CreateExpenseCategoryDto } from '../dto';
import { IExpenseCategory } from '../interfaces';

@Controller('expenses/categories')
export class ExpenseCategoryController {
    constructor(private readonly expenseCategoryService: ExpenseCategoryService) {
    }

    @Get()
    public async findAll(@Req() req) {
        return await this.expenseCategoryService.findAll(req.user.orgId);
    }

    @Get(':id')
    public async findOne(@Req() req, @Param('id', new ObjectIdPipe()) id): Promise<IExpenseCategory> {
        return await this.expenseCategoryService.findOne(req.user.orgId, id);
    }

    @Post()
    public async create(@Req() req, @Body() createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<any> {
        return await this.expenseCategoryService.create(req.user.orgId, createExpenseCategoryDto);
    }
}