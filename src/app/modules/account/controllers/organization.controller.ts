import { Controller, Get, Req } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { IOrganization } from '../interfaces/organization.interface';

@Controller('organizations')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {
    }

    /**
     * @api {get} /organizations Get
     * @apiName Get
     * @apiGroup Organization
     * @apiDescription get organization
     *
     * @apiUse AuthHeader
     *
     * @apiSuccess {String} id Organization ID.
     * @apiSuccess {String} name Organization Name.
     * @apiSuccess {String} address Organization Street Address.
     * @apiSuccess {String} addressTwo Organization Street Address Two.
     * @apiSuccess {String} city Organization City.
     * @apiSuccess {String} state Organization State.
     * @apiSuccess {String} postalCode Organization PostalCode or Zip.
     * @apiSuccess {String} country Organization Country.
     * @apiSuccess {String} email Organization billing email.
     * @apiSuccess {String} phone Organization contact phone number.
     * @apiSuccess {String} companySite Organization website URL.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *  {
     *     "id": "59eacd024d03ee001282a73f",
     *     "name": "Uinta Software",
     *     "address": "123 Sesame St.",
     *     "city": "Park City",
     *     "state": "UT",
     *     "postalCode": "84060",
     *     "country": "USA",
     *     "email": "ar@uintasoft.com",
     *     "phone": "801-111-2222",
     *     "companySite": "http://www.uintasoft.com"
     *  }
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Get()
    async find(@Req() req): Promise<IOrganization> {

        return this.organizationService.find(req.user.organization);
    }
}
