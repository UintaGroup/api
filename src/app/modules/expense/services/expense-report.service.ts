import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IExpenseReport, IExpense } from '../interfaces';
import { CreateExpenseReportDto, UpdateExpenseReportDto, CreateExpenseDto } from '../dto';
import { ReportStatus } from '../enum';
import { ExpenseReportSchema, ExpenseSchema } from '../schema';
import { MongoException } from '../../common/exceptions';
import { User } from '../../user/interfaces';

@Component()
export class ExpenseReportService {
    constructor(@InjectModel(ExpenseReportSchema) private readonly expenseReportModel: Model<IExpenseReport>,
                @InjectModel(ExpenseSchema) private readonly expenseModel: Model<IExpense>) {
    }

    async findAll(user: User): Promise<IExpenseReport[]> {
        try {
            return await this.expenseReportModel.find({user}).exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async findOne(user: User, id: string): Promise<IExpenseReport> {
        try {
            return await this.expenseReportModel.findOne({user, _id: id}).exec();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async create(user: User, createExpenseReportDto: CreateExpenseReportDto): Promise<IExpenseReport> {
        try {
            const expenseReport = new this.expenseReportModel(createExpenseReportDto);
            expenseReport.user = user;
            return await expenseReport.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async update(user: User, id: string, updateExpenseReportDto: UpdateExpenseReportDto): Promise<void> {
        try {
            await this.expenseReportModel.findOneAndUpdate({user, _id: id}, updateExpenseReportDto);
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async transition(user: User, id: string, status: ReportStatus): Promise<void> {
        try {
            await this.expenseReportModel.findOneAndUpdate({user, _id: id}, {status});
        } catch (err) {
            throw new MongoException(err);
        }
    }
}
