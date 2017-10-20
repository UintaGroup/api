import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { IExpenseReport } from '../interfaces';
import { MongoException } from '../../database/exceptions';
import { CreateExpenseReportDto } from '../dto';
import { IUser } from '../../account/interfaces/user.interface';
import { UpdateExpenseReportDto } from '../dto/update-expense-report.dto';

@Component()
export class ExpenseReportService {
    constructor(@Inject('ExpenseReportModelToken') private readonly expenseReportModel: Model<IExpenseReport>) {
    }

    async findAll(user: IUser): Promise<IExpenseReport[]> {
        try {
            return await this.expenseReportModel.find({user}).exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async findOne(user: IUser, id: string): Promise<IExpenseReport> {
        try {
            return await this.expenseReportModel.findOne({user, _id: id})
                .exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async create(user: IUser, createExpenseReportDto: CreateExpenseReportDto): Promise<IExpenseReport> {
        try {
            const expenseReport = new this.expenseReportModel(createExpenseReportDto);
            expenseReport.user = user;
            return await expenseReport.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async update(user: IUser, id: string,  updateExpenseReportDto: UpdateExpenseReportDto): Promise<void> {
        try {
            const report = await this.findOne(user, id);
            report.status = updateExpenseReportDto.status;
            await report.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }
}
