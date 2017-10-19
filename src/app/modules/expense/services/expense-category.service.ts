import { Model } from 'mongoose';
import { Component, Inject, UseGuards } from '@nestjs/common';
import { IExpenseCategory } from '../interfaces';
import { MongoException } from '../../database/exceptions';
import { CreateExpenseCategoryDto } from '../dto';
import { RolesGuard } from '../../auth/guards';
import { Roles } from '../../auth/decorators/roles.decorator';
import { IOrganization } from '../../account/interfaces/organization.interface';

@Component()
@UseGuards(RolesGuard)
export class ExpenseCategoryService {
    constructor(@Inject('ExpenseCategoryModelToken') private readonly expenseCategoryModel: Model<IExpenseCategory>) {
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
    async create(org: IOrganization, createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<IExpenseCategory> {
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
