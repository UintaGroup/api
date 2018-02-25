import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IExpenseCategory } from '../interfaces';
import { CreateExpenseCategoryDto } from '../dto';
import { MongoException } from '../../common/exceptions';
import { Roles } from '../../auth/decorators';
import { Organization } from '../../account/interfaces/';
import { ExpenseReportSchema } from '../schema';

@Component()
export class ExpenseCategoryService {
    constructor(@InjectModel(ExpenseReportSchema) private readonly expenseCategoryModel: Model<IExpenseCategory>) {
    }

    async findOne(orgId: string, id: string): Promise<IExpenseCategory> {
        try {
            return await this.expenseCategoryModel.findOne({organization: orgId, _id: id})
                .exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    @Roles('admin')
    async create(org: Organization, createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<IExpenseCategory> {
        try {
            const expenseCategory = new this.expenseCategoryModel(createExpenseCategoryDto);
            expenseCategory.organization = org;
            return await expenseCategory.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async findAll(orgId: string): Promise<IExpenseCategory[]> {
        try {
            return await this.expenseCategoryModel.find({organization: orgId}).exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }
}
