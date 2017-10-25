import { Controller, Get, Post, Body, Req, Param, Put } from '@nestjs/common';
import { ObjectIdPipe } from '../../common/pipes';
import { ExpenseReportService } from '../services';
import { CreateExpenseReportDto, UpdateExpenseReportDto } from '../dto';
import { IExpenseReport } from '../interfaces';

/**
 * @apiDefine AuthHeader
 * @apiHeader {String} authorization JWT Bearer Token
 * @apiHeaderExample {String} Bearer Token Example:
 *  {
 *    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI3IkpXVCJ9.eyJlbWFpbCI6InNjbGFya2xhc2xleUBnbWFpbC5jb20iLCJpYXQiOjE1MDg1NjAxNTgsImV4cCI6MTUwODU2Mzc1OH0.ytIw5l-lKlFsjq4pyGNAOEM8nsXvvwT4YcL5f4w6rVw"
 *  }
 */
/**
 * @apiDefine Unauthorized
 * @apiError Unauthorized
 * @apiErrorExample
 * HTTP/1.1 401 Unauthorized
 * {
 *   "statusCode": 401,
 *   "message": "Unauthorized"
 * }
 */
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
     * @apiName Expense Create
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {Object} report Expense Report
     * @apiParam {String} report.name Report Name.
     * @apiParam {Number} report.status Report Status.
     * @apiParam {Date} report.startDate Report Starting Date.
     * @apiParam {Date} report.endDate Report Ending Date.
     * @apiParam {Object[]} report.expenses Expenses
     * @apiParam {Object} report.expenses.expense Expense Item
     * @apiParam {Number} report.expenses.expense.amount] Expense Amount.
     * @apiParam {String} report.expenses.expense.description] Expense Description.
     * @apiParam {Date} report.expenses.expense.expenseDate] Expense Date.
     * @apiParam {String} report.expenses.expense.merchant] Expense Merchant.
     * @apiParamExample
     * {
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
     *     "endDate": "2017-01-06T00:00:00.000Z",
     *     "startDate": "2017-01-06T00:00:00.000Z"
     * }
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
     *   {
     *     "user": "59e7babe77e0253e14970024",
     *     "name": "Report one",
     *     "description": "My Description",
     *     "expenses": [
     *       {
     *         "amount": 1,
     *         "description": "",
     *         "expenseDate": "2017-01-07T00:00:00.000Z",
     *         "merchant": "BestBuy"
     *       },
     *       {
     *         "amount": 1,
     *         "description": "",
     *         "expenseDate": "2017-01-06T00:00:00.000Z",
     *         "merchant": "NewEgg"
     *       }
     *     ],
     *     "status": 1,
     *     "endDate": "2017-01-06T00:00:00.000Z",
     *     "startDate": "2017-01-06T00:00:00.000Z",
     *     "id": "59e81ca929c5e733dfebf78f"
     *   },
     *   {
     *     "user": "59e7babe77e0253e14970024",
     *     "name": "Report one",
     *     "description": "My Description",
     *     "expenses": [
     *       {
     *         "amount": 1,
     *         "description": "Expense Description",
     *         "expenseDate": "2017-01-07T00:00:00.000Z",
     *         "merchant": "BestBuy"
     *       },
     *       {
     *         "amount": 5,
     *         "description": "",
     *         "expenseDate": "2017-01-06T00:00:00.000Z",
     *         "merchant": "NewEgg"
     *       }
     *     ],
     *     "status": 0,
     *     "endDate": "2017-01-06T00:00:00.000Z",
     *     "startDate": "2017-01-06T00:00:00.000Z",
     *     "id": "59e81d3e29c5e733dfebf792"
     *   }
     * ]
     *
     * @apiUse Unauthorized
     */
    @Post()
    public async create(@Req() req, @Body() createExpenseReportDto: CreateExpenseReportDto): Promise<any> {
        return await this.expenseReportService.create(req.user, createExpenseReportDto);
    }

    /**
     * @api {put} /expenses/reports/:id Update Status
     * @apiName Expense Update Status
     * @apiGroup Expense Reports
     *
     * @apiUse AuthHeader
     *
     * @apiParam {Number} status Report Status.
     * @apiParamExample
     * {
     *   "status": 1
     * }
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Put(':id')
    public async updateStatus(@Req() req, @Param('id', new ObjectIdPipe()) id,  @Body() updateExpenseReportDto: UpdateExpenseReportDto): Promise<any> {
        return await this.expenseReportService.update(req.user, id, updateExpenseReportDto);
    }
}