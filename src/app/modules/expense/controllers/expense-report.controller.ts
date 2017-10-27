import { Controller, Get, Post, Body, Req, Param, Put } from '@nestjs/common';
import { ObjectIdPipe } from '../../common/pipes';
import { ExpenseReportService } from '../services';
import { CreateExpenseReportDto, UpdateExpenseReportDto, CreateExpenseDto } from '../dto';
import { IExpenseReport } from '../interfaces';
import { ReportStatus } from '../enum';

@Controller('expenses/reports')
export class ExpenseReportController {
    constructor(private readonly expenseReportService: ExpenseReportService) {
    }

    /**
     * @api {get} /expenses/reports Get All
     * @apiName Get All
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiSuccess {Object[]} reports Expense Reports
     * @apiSuccess {Object} reports.report Expense Report
     * @apiSuccess {String} [reports.report.id] Report Id.
     * @apiSuccess {String} reports.report.user Id of Report Creator.
     * @apiSuccess {String} reports.report.name Report Name.
     * @apiSuccess {String} reports.report.description Report Description.
     * @apiSuccess {Number} reports.report.status Report Status.
     * @apiSuccess {Date} reports.report.startDate Report Starting Date.
     * @apiSuccess {Date} reports.report.endDate Report Ending Date.
     * @apiSuccess {Object[]} reports.report.expenses Expenses
     * @apiSuccess {Object} reports.report.expenses.expense Expense Item
     * @apiSuccess {Number} reports.report.expenses.expense.amount] Expense Amount.
     * @apiSuccess {String} reports.report.expenses.expense.description] Expense Description.
     * @apiSuccess {Date} reports.report.expenses.expense.expenseDate] Expense Date.
     * @apiSuccess {String} reports.report.expenses.expense.merchant] Expense Merchant.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * [
     * {
     *     "user": "59e7babe77e0253e14970024",
     *     "name": "Report one",
     *     "description": "My Description",
     *     "expenses": [
     *         {
     *             "amount": 1,
     *             "description": "",
     *             "expenseDate": "2017-01-07T00:00:00.000Z",
     *             "merchant": "BestBuy"
     *         },
     *         {
     *             "amount": 1,
     *             "description": "",
     *             "expenseDate": "2017-01-06T00:00:00.000Z",
     *             "merchant": "NewEgg"
     *         }
     *     ],
     *     "status": 1,
     *     "endDate": "2017-01-06T00:00:00.000Z",
     *     "startDate": "2017-01-06T00:00:00.000Z",
     *     "id": "59e81ca929c5e733dfebf78f"
     * },
     * {
     *     "user": "59e7babe77e0253e14970024",
     *     "name": "Report one",
     *     "description": "My Description",
     *     "expenses": [
     *         {
     *             "amount": 1,
     *             "description": "Expense Description",
     *             "expenseDate": "2017-01-07T00:00:00.000Z",
     *             "merchant": "BestBuy"
     *         },
     *         {
     *             "amount": 5,
     *             "description": "",
     *             "expenseDate": "2017-01-06T00:00:00.000Z",
     *             "merchant": "NewEgg"
     *         }
     *     ],
     *     "status": 0,
     *     "endDate": "2017-01-06T00:00:00.000Z",
     *     "startDate": "2017-01-06T00:00:00.000Z",
     *     "id": "59e81d3e29c5e733dfebf792"
     * }
     * ]
     * @apiUse Unauthorized
     */
    @Get()
    public async findAll(@Req() req) {
        return await this.expenseReportService.findAll(req.user);
    }

    /**
     * @api {get} /expenses/reports/:id Get by ID
     * @apiName Get
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {string} id Expense Report ID
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *   "user": "59e7babe77e0253e14970024",
     *   "name": "Report one",
     *   "description": "My Description",
     *   "expenses": [
     *     {
     *       "amount": 1,
     *       "description": "",
     *       "expenseDate": "2017-01-07T00:00:00.000Z",
     *       "merchant": "BestBuy"
     *     },
     *     {
     *       "amount": 1,
     *       "description": "",
     *       "expenseDate": "2017-01-06T00:00:00.000Z",
     *       "merchant": "NewEgg"
     *     }
     *   ],
     *   "status": 1,
     *   "endDate": "2017-01-06T00:00:00.000Z",
     *   "startDate": "2017-01-06T00:00:00.000Z",
     *   "id": "59e81ca929c5e733dfebf78f"
     * }
     *
     * @apiError BadRequest Invalid Report Id.
     * @apiErrorExample
     * HTTP/1.1 400 Bad Request
     * {
     *   "statusCode": 400,
     *   "message": "Invalid Id"
     * }
     *
     * @apiUse Unauthorized
     */
    @Get(':id')
    public async findOne(@Req() req, @Param('id', new ObjectIdPipe()) id): Promise<IExpenseReport> {
        return await this.expenseReportService.findOne(req.user, id);
    }

    /**
     * @api {post} /expenses/reports Create
     * @apiName ExpenseReport Create
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {Object} report Expense Report
     * @apiParam {String} report.name Report name.
     * @apiParam {Number} [report.description] Report description.
     * @apiParam {Date} report.startDate Report period start.
     * @apiParam {Date} report.endDate Report period end.
     * @apiParam {Object[]} [report.expenses] Expenses
     * @apiParam {Object} report.expenses.expense Expense item
     * @apiParam {Number} report.expenses.expense.amount] Expense amount.
     * @apiParam {String} report.expenses.expense.description] Expense description.
     * @apiParam {Date} report.expenses.expense.expenseDate] Expense date.
     * @apiParam {String} report.expenses.expense.merchant] Expense merchant.
     * @apiParamExample Request Example
     * {
     *   "name": "Report one",
     *   "description": "My Description",
     *   "endDate": "2017-01-06T00:00:00.000Z",
     *   "startDate": "2017-01-06T00:00:00.000Z",
     *   "expenses": [
     *       {
     *           "amount": 10.00,
     *           "description": "",
     *           "expenseDate": "2017-01-07T00:00:00.000Z",
     *           "merchant": "BestBuy"
     *       },
     *       {
     *           "amount": 800.00,
     *           "description": "",
     *           "expenseDate": "2017-01-06T00:00:00.000Z",
     *           "merchant": "NewEgg"
     *       }
     *   ]
     * }
     *
     * @apiSuccess {Object} report Expense Report
     * @apiSuccess {String} report.id Report Id.
     * @apiSuccess {String} report.user Id of Report Creator.
     * @apiSuccess {String} report.name Report Name.
     * @apiSuccess {String} report.description Report Description.
     * @apiSuccess {Number} report.status Report Status.
     * @apiSuccess {Date} report.startDate Report Starting Date.
     * @apiSuccess {Date} report.endDate Report Ending Date.
     * @apiSuccess {Object[]} [report.expenses] Expenses
     * @apiSuccess {Object} report.expenses.expense Expense Item
     * @apiSuccess {Number} report.expenses.expense.amount] Expense Amount.
     * @apiSuccess {String} report.expenses.expense.description] Expense Description.
     * @apiSuccess {Date} report.expenses.expense.expenseDate] Expense Date.
     * @apiSuccess {String} report.expenses.expense.merchant] Expense Merchant.
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "id": "59e81ca929c5e733dfebf78f",
     *   "user": {
     *     "email": "sclarklasley@gmail.com"
     *   },
     *   "name": "Report one",
     *   "description": "My Description",
     *   "endDate": "2017-01-06T00:00:00.000Z",
     *   "startDate": "2017-01-06T00:00:00.000Z",
     *   "status": 1,
     *   "expenses": [
     *     {
     *       "amount": 1,
     *       "description": "",
     *       "expenseDate": "2017-01-07T00:00:00.000Z",
     *       "merchant": "BestBuy"
     *     },
     *     {
     *       "amount": 1,
     *       "description": "",
     *       "expenseDate": "2017-01-06T00:00:00.000Z",
     *       "merchant": "NewEgg"
     *     }
     *   ]
     * }
     *
     * @apiUse Unauthorized
     */
    @Post()
    public async create(@Req() req, @Body() createExpenseReportDto: CreateExpenseReportDto): Promise<any> {
        return await this.expenseReportService.create(req.user, createExpenseReportDto);
    }

    /**
     * @api {put} /expenses/reports/:id Update
     * @apiName Expense Update
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {String} name Report name.
     * @apiParam {String} [description] Report description.
     * @apiParam {Date} startDate Report period start.
     * @apiParam {Date} endDate Report period end.
     * @apiParamExample
     * {
     *   "name": "Report one",
     *   "description": "Conference",
     *   "endDate": "2017-01-06T00:00:00.000Z",
     *   "startDate": "2017-01-06T00:00:00.000Z"
     * }
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Put(':id')
    public async update(@Req() req, @Param('id', new ObjectIdPipe()) id, @Body() updateExpenseReportDto: UpdateExpenseReportDto): Promise<any> {
        return await this.expenseReportService.update(req.user, id, updateExpenseReportDto);
    }

    /**
     * @api {put} /expenses/reports Add Expense
     * @apiName Add Expense
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {Number} amount Expense amount.
     * @apiParam {String} description Expense description.
     * @apiParam {Date} [expenseDate] Expense date.
     * @apiParam {String} merchant Expense merchant.
     * @apiParamExample Request Example
     * {
     *   "amount": 10.00,
     *   "description": "",
     *   "expenseCategoryId": "59e7e2b777e0253e14970032",
     *   "expenseDate": "2017-01-07T00:00:00.000Z",
     *   "merchant": "BestBuy"
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Put(':id/expenses')
    public async addExpense(@Req() req, @Param('id', new ObjectIdPipe()) id, @Body() createExpenseDto: CreateExpenseDto): Promise<void> {
       return await this.expenseReportService.addExpense(req.user, id, createExpenseDto);
    }

    /**
     * @api {put} /expenses/reports/:id/approve Transition:Approved
     * @apiName Transition to Approved
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {string} id Expense Report ID
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Put(':id/approve')
    public async approve(@Req() req, @Param('id', new ObjectIdPipe()) id): Promise<any> {
        return await this.expenseReportService.transition(req.user, id, ReportStatus.Approved);
    }

    /**
     * @api {put} /expenses/reports/:id/submit Transition:Submitted
     * @apiName Transition Report:Submitted
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {string} id Expense Report ID
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Put(':id/submit')
    public async submit(@Req() req, @Param('id', new ObjectIdPipe()) id): Promise<any> {
        return await this.expenseReportService.transition(req.user, id, ReportStatus.Submitted);
    }

    /**
     * @api {put} /expenses/reports/:id/decline Transition:Declined
     * @apiName Transition Report to Declined
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {string} id Expense Report ID
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Put(':id/decline')
    public async decline(@Req() req, @Param('id', new ObjectIdPipe()) id): Promise<any> {
        return await this.expenseReportService.transition(req.user, id, ReportStatus.Declined);
    }

    /**
     * @api {put} /expenses/reports/:id/paid Transition:Paid
     * @apiName Transition Report to Paid
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {string} id Expense Report ID
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Put(':id/paid')
    public async paid(@Req() req, @Param('id', new ObjectIdPipe()) id): Promise<any> {
        return await this.expenseReportService.transition(req.user, id, ReportStatus.Paid);
    }
}