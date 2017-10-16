import { Controller, Get, Req } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { IOrganization } from '../interfaces/organization.interface';

@Controller('organizations')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {
    }

    @Get()
    async find(@Req() req): Promise<IOrganization> {

        return this.organizationService.find(req.user.organization);
    }
}
