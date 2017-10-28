import { Controller, Post, Get, Body, Put, Req, Param } from '@nestjs/common';
import { UserService } from '../services';
import { IUser } from '../interfaces';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Roles } from '../../auth/decorators';

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
    async findAll(@Req() req): Promise<IUser[]> {
        return this.userService.findAll(req.user.orgId);
    }

    /**
     * @api {post} /users Create
     * @apiName Create User
     * @apiGroup Users
     * @apiPermission admin
     *
     * @apiUse AuthHeader
     *
     * @apiParam {String} email User's email address.
     * @apiParam {String} password User's desired Password.
     * @apiParamExample {json} Request-Example:
     * {
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
     *  "email": "flurrytime@gmail.com",
     *  "active": true,
     *  "roles": []
     * }
     *
     * @apiUse Unauthorized
     */
    @Post()
    @Roles('admin')
    async create(@Req() req, @Body() createUserDto: CreateUserDto): Promise<IUser> {
        return await this.userService.create(req.user.organization, createUserDto);
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
    async me(@Req() req): Promise<IUser> {
        return this.userService.find(req.user.orgId, req.user.id);
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
    @Get(':id')
    @Roles('admin')
    async find(@Req() req, @Param('id') id): Promise<IUser> {
        return this.userService.find(req.user.orgId, id);
    }

    /**
     * @api {put} /users Update Me
     * @apiName Update Me
     * @apiGroup Users
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
    @Put()
    async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
        this.userService.update(req.user.orgId, req.user.id, updateUserDto);
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
    async update(@Req() req, @Param('id') id, @Body() updateUserDto: UpdateUserDto) {
        this.userService.update(req.user.orgId, id, updateUserDto);
    }
}
