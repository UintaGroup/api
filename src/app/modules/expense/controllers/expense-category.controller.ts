import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { ObjectIdPipe } from '../../common/pipes';
import { ExpenseCategoryService } from '../services';
import { CreateExpenseCategoryDto } from '../dto';
import { IExpenseCategory } from '../interfaces';

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
 * HTTP/1.1 401 OK
 * {
 *   "statusCode": 401,
 *   "message": "Unauthorized"
 * }
 */
@Controller('expenses/categories')
export class ExpenseCategoryController {
    constructor(private readonly expenseCategoryService: ExpenseCategoryService) {
    }
    /**
     * @api {get} /expenses/categories Get All
     * @apiName All
     * @apiGroup Expense Categories
     *
     * @apiUse AuthHeader
     *
     * @apiSuccess {Object[]} expenses Expense Categories.
     * @apiSuccess {String} expenses.name Category Name.
     * @apiSuccess {String} expenses.description Description.
     * @apiSuccess {String} expenses.sourceSystemId Id linking category to source system, if not specified on creation will be same as id.
     * @apiSuccess {String} expenses.id Unique Id.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [
     *    {
     *      "name": "Category",
     *      "description": "My Description",
     *      "sourceSystemId": "1",
     *      "id": "59e7e2b777e0253e14970032"
     *    },
     *    {
     *      "name": "Category",
     *      "description": "My Description",
     *      "sourceSystemId": "2",
     *      "id": "59e7e2d777e0253e14970033"
     *    },
     *    {
     *      "name": "Category",
     *      "description": "",
     *      "sourceSystemId": "3",
     *      "id": "59e7e2dd77e0253e14970034"
     *    }
     *  ]
     *
     * @apiUse Unauthorized
     *
     */
    @Get()
    public async findAll(@Req() req) {
        return await this.expenseCategoryService.findAll(req.user.organization);
    }

    /**
     * @api {get} /expenses/categories/:id Get by ID
     * @apiName Get
     * @apiGroup Expense Categories
     *
     * @apiUse AuthHeader
     *
     * @apiParam {string} id Expense Category ID
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "name": "Category",
     *   "description": "My Description",
     *   "sourceSystemId": "1",
     *   "id": "59e7e2b777e0253e14970032"
     * },
     *
     * @apiError BadRequest Invalid Id.
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
    public async findOne(@Req() req, @Param('id', new ObjectIdPipe()) id): Promise<IExpenseCategory> {
        return await this.expenseCategoryService.findOne(req.user.organization, id);
    }

    /**
     * @api {post} /expenses/categories Create
     * @apiName Expense Create
     * @apiGroup Expense Categories
     *
     * @apiUse AuthHeader
     *
     * @apiParam {String} name Category Name.
     * @apiParam {String} [description] Category Description.
     * @apiParam {String} [sourceSystemId] Id of source system.
     * @apiParamExample
     * {
     *   "name": "Category One",
     *   "description": "My Description",
     *   "sourceSystemId": "LEDGERACCOUNT0000123"
     * }
     *
     * @apiSuccess {String} id
     * @apiSuccess {String} name
     * @apiSuccess {String} description
     * @apiSuccess {String} sourceSystemId
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *   "id": "59e7e2b777e0253e14970032"
     *   "name": "Category One",
     *   "description": "My Description",
     *   "sourceSystemId": "LEDGERACCOUNT0000123"
     * }
     *
     * @apiUse Unauthorized
     */
    @Post()
    public async create(@Req() req, @Body() createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<any> {
        return await this.expenseCategoryService.create(req.user.organization, createExpenseCategoryDto);
    }
}