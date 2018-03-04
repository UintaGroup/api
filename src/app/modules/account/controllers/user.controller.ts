import { Controller, Post, Get, Body, Put, Param } from '@nestjs/common';
import { UserService } from '../services';
import { User } from '../interfaces';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Roles } from '../../auth/decorators';
import { ReqContext } from '../decorators';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    /**
     * @api {get} /users Get All
     * @apiName Get All
     * @apiGroup Users
     * @apiPermission admin
     *
     * @apiUse AuthHeader
     *
     * @apiSuccess {Object[]} users Users
     * @apiSuccess {String} id User Id
     * @apiSuccess {String} users.email Email
     * @apiSuccess {Boolean} users.active User Status
     * @apiSuccess {String[]} users.roles User Roles.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * [
     *   {
     *     "id": "59e81ca929c5e733dfebf78f",
     *     "email": "sclarklasley@gmail.com",
     *     "active": true,
     *     "roles": [
     *         "admin"
     *     ]
     *  },
     *  {
     *      "id": "59e81ca929c5e733dfbbf78f",
     *      "email": "flurrytime@gmail.com",
     *      "active": true,
     *      "roles": [
     *         "admin"
     *      ]
     *  },
     *  {
     *     "id": "59e81ca929c5c733dfebf78f",
     *      "email": "anotheruser@gmail.com",
     *      "active": true,
     *      "roles": []
     *  }
     * ]
     *
     * @apiUse Unauthorized
     */
    @Get()
    @Roles('admin')
    async findAll(@ReqContext() ctx): Promise<User[]> {
        return this.userService.findAll(ctx.orgId);
    }

    /**
     * @api {post} /users Create
     * @apiName Create User
     * @apiGroup Users
     * @apiPermission admin
     *
     * @apiUse AuthHeader
     *
     * @apiParam {String} firstName User's first name.
     * @apiParam {String} lastName User's last name.
     * @apiParam {String} [externalId] External systemId.
     * @apiParam {String} email User's email address.
     * @apiParam {String{8-20}} password User's desired Password.
     * @apiParamExample {json} Request-Example:
     * {
     *  "firstName": "Stone",
     *  "lastName": "Lasley",
     *  "externalId": "12345",
     *  "email": "flurrytime@gmail.com",
     *  "password": "Passw0rd1"
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 201 OK
     * {
     *  "organization": {
     *    "name": "Uinta Software",
     *    "address": "265 Clover Ridge Dr.",
     *    "city": "Sandy",
     *    "state": "UT",
     *    "postalCode": "84070",
     *    "country": "USA",
     *    "email": "sclarklasley@gmail.com",
     *    "phone": "435-729-9510",
     *    "companySite": "http://www.uintasoftare.com",
     *    "users": [],
     *    "active": true,
     *    "id": "59eacd0a4d03ee001282a73f"
     *  },
     *    "firstName": "Stone",
     *    "lastName": "Lasley",
     *    "externalId": "12345",
     *    "email": "flurrytime@gmail.com",
     *    "active": true,
     *    "roles": []
     * }
     *
     * @apiUse Unauthorized
     */
    @Post()
    @Roles('admin')
    async create(@ReqContext() ctx, @Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(ctx.organization, createUserDto);
    }

    /**
     * @api {get} /users Me
     * @apiName Get My User
     * @apiGroup Users
     *
     * @apiUse AuthHeader
     *
     * @apiSuccess {String} id User Id
     * @apiSuccess {String} email Email
     * @apiSuccess {Boolean} active User Status
     * @apiSuccess {String[]} roles User Roles.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *   {
     *     "id": "59e81ca929c5e733dfebf78f",
     *     "email": "sclarklasley@gmail.com",
     *     "active": true,
     *     "roles": [
     *         "admin"
     *     ]
     *   }
     *
     * @apiUse Unauthorized
     */
    @Get('me')
    async me(@ReqContext() ctx): Promise<User> {
        return this.userService.find(ctx.orgId, ctx.userId);
    }

    /**
     * @api {get} /users/:id Get By Id
     * @apiName Get by Id
     * @apiGroup Users
     * @apiPermission admin
     *
     * @apiUse AuthHeader
     *
     * @apiParam {string} id User ID
     *
     * @apiSuccess {String} id User Id
     * @apiSuccess {String} email Email
     * @apiSuccess {Boolean} active User Status
     * @apiSuccess {String[]} roles User Roles.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *   {
     *    "firstName": "Stone",
     *    "lastName": "Lasley",
     *    "externalId": "12345",
     *    "email": "flurrytime@gmail.com",
     *    "active": true,
     *    "roles": []
     *     "active": true,
     *     "roles": [
     *         "admin"
     *     ]
     *   }
     *
     * @apiUse Unauthorized
     */
    @Get(':id')
    @Roles('admin')
    async find(@ReqContext() ctx, @Param('id') id): Promise<User> {
        return this.userService.find(ctx.orgId, id);
    }

    /**
     * @api {put} /users Update Me
     * @apiName Update Me
     * @apiGroup Users
     *
     * @apiUse AuthHeader
     *
     * @apiParam {String} [firstName[ User's first name.
     * @apiParam {String} [lastName] User's last name.
     * @apiParam {String} [externalId] External systemId.
     * @apiParam {String} [password] User's desired Password.
     * @apiParamExample {json} Request-Example:
     * {
     *  "firstName": "Stone",
     *  "lastName": "Lasley",
     *  "externalId": "12345",
     *  "password": "Passw0rd1"
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 201 OK
     * {
     *  "organization": {
     *    "name": "Uinta Software",
     *    "address": "265 Clover Ridge Dr.",
     *    "city": "Sandy",
     *    "state": "UT",
     *    "postalCode": "84070",
     *    "country": "USA",
     *    "email": "sclarklasley@gmail.com",
     *    "phone": "435-729-9510",
     *    "companySite": "http://www.uintasoftare.com",
     *    "users": [],
     *    "active": true,
     *    "id": "59eacd0a4d03ee001282a73f"
     *  },
     *  {
     *    "firstName": "Stone",
     *    "lastName": "Lasley",
     *    "externalId": "12345",
     *    "email": "flurrytime@gmail.com",
     *    "active": true,
     *    "roles": []
     * }
     *
     * @apiUse Unauthorized
     */
    @Put()
    async updateMe(@ReqContext() ctx, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(ctx.user.orgId, ctx.user.id, updateUserDto);
    }

    /**
     * @api {put} /users/:id Update User
     * @apiName Update User
     * @apiGroup Users
     * @apiPermission admin
     *
     * @apiUse AuthHeader
     *
     * @apiParam {String} password User's desired Password.
     * @apiParamExample {json} Request-Example:
     * {
     *  "password": "Passw0rd1"
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 201 OK
     * {
     *  "organization": {
     *    "name": "Uinta Software",
     *    "address": "265 Clover Ridge Dr.",
     *    "city": "Sandy",
     *    "state": "UT",
     *    "postalCode": "84070",
     *    "country": "USA",
     *    "email": "sclarklasley@gmail.com",
     *    "phone": "435-729-9510",
     *    "companySite": "http://www.uintasoftare.com",
     *    "users": [],
     *    "active": true,
     *    "id": "59eacd0a4d03ee001282a73f"
     *  },
     *  "email": "flurrytime@gmail.com",
     *  "active": true,
     *  "roles": []
     * }
     *
     * @apiUse Unauthorized
     */
    @Put(':id')
    @Roles('admin')
    async update(@ReqContext() ctx, @Param('id') id, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(ctx.orgId, id, updateUserDto);
    }
}
