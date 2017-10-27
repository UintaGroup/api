import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { IUser } from '../../account/interfaces';
import { IExpenseReport, IExpense } from '../interfaces';
import { MongoException } from '../../database/exceptions';
import { CreateExpenseReportDto, UpdateExpenseReportDto, CreateExpenseDto } from '../dto';
import { ReportStatus } from '../enum';

@Component()
export class ExpenseReportService {
    constructor(@Inject('ExpenseReportModelToken') private readonly expenseReportModel: Model<IExpenseReport>,
                @Inject('ExpenseModelToken') private readonly expenseModel: Model<IExpense>) {
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

    async addExpense(user: IUser, id: string, createExpenseDto: CreateExpenseDto): Promise<void> {
        try {
            const report = await this.findOne(user, id);
            const expense = new this.expenseModel(createExpenseDto);
            report.expenses.push(expense);
            await report.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async update(user: IUser, id: string, updateExpenseReportDto: UpdateExpenseReportDto): Promise<void> {
        try {
            const report = await this.findOne(user, id);
            report.name = updateExpenseReportDto.name;
            report.description = updateExpenseReportDto.description;
            report.startDate = updateExpenseReportDto.startDate;
            report.endDate = updateExpenseReportDto.endDate;
            await report.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }

    async transition(user: IUser, id: string, status: ReportStatus): Promise<void> {
        try {
            const report = await this.findOne(user, id);
            report.status = status;
            await report.save();
        } catch (err) {
            throw new MongoException(err);
        }
    }
}
