import { Controller, Post, Body } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountDto } from '../dto';
import { IAccount } from '../interfaces';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    /**
     * @api {post} /accounts Create
     * @apiName Create Account
     * @apiGroup Account
     *
     * @apiParam {Object} user Account Administrator
     * @apiParam {String} user.email Admin User's email address.
     * @apiParam {String} user.password Admin User's desired password.
     * @apiParam {Object} organization Account Organization
     * @apiParam {String} organization.name Unique Organization Name.
     * @apiParam {String} organization.address Organization Street Address.
     * @apiParam {String} [organization.addressTwo] Organization Street Address Two.
     * @apiParam {String} organization.city Organization City.
     * @apiParam {String{2}="UT, TX, NY,..."} organization.state Organization State *UpperCase.
     * @apiParam {String} organization.postalCode Organization PostalCode or Zip.
     * @apiParam {String{3}="USA, THA, MHL,..."} organization.country Organization Country *UpperCase.
     * @apiParam {String} organization.email Organization billing email.
     * @apiParam {String} organization.phone Organization contact phone number.
     * @apiParam {String} [organization.companySite] Organization website URL.
     *
     * @apiParamExample Request-Example:
     * {
     *  "user": {
     *      "email": "flurrytime@gmail.com",
     *      "password": "MyPassw0rd!"
     *  },
     *  "organization": {
     *    "name": "Uinta Software",
     *    "address": "123 Sesame St.",
     *    "city": "Park City",
     *    "state": "UT",
     *    "postalCode": "84060",
     *    "country": "USA",
     *    "email": "ar@uintasoft.com",
     *    "phone": "801-111-2222",
     *    "companySite": "www.uintasoft.com"
     *  }
     * }
     *
     * @apiSuccess {Object} user Account administrator.
     * @apiSuccess {String} user.email Admin User's email address.
     * @apiSuccess {String} user.password Admin User's desired password.
     * @apiSuccess {Object} organization Account Organization.
     * @apiSuccess {String} organization.name Organization Name.
     * @apiSuccess {String} organization.address Organization Street Address.
     * @apiSuccess {String} [organization.addressTwo] Organization Street Address Two.
     * @apiSuccess {String} organization.city Organization City.
     * @apiSuccess {String} organization.state Organization State.
     * @apiSuccess {String} organization.postalCode Organization PostalCode or Zip.
     * @apiSuccess {String} organization.country Organization Country.
     * @apiSuccess {String} organization.email Organization billing email.
     * @apiSuccess {String} organization.phone Organization contact phone number.
     * @apiSuccess {String} organization.companySite Organization website URL.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *  {
     *    "organization": {
     *      "name": "Uinta Software",
     *      "address": "123 Sesame St.",
     *      "city": "Park City",
     *      "state": "UT",
     *      "postalCode": "84060",
     *      "country": "USA",
     *      "email": "ar@uintasoft.com",
     *      "phone": "801-111-2222",
     *      "companySite": "www.uintasoft.com",
     *      "users": [],
     *      "id": "59eacd024d03ee001282a73f"
     *    },
     *    "user": {
     *      "email": "flurrytime@gmail.com",
     *      "roles": [
     *        "admin"
     *      ]
     *    }
     *  }
     *
     * @apiError Validation Failed.
     * @apiError Conflict 409 User's Email or Company name already exist.
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 409 Not Found
     * {
     *   "statusCode": "409",
     *   "message": "Conflict"
     * }
     */
    @Post()
    async create(@Body() createAccountDto: CreateAccountDto): Promise<IAccount> {
        return await this.accountService.create(createAccountDto);
    }
}
