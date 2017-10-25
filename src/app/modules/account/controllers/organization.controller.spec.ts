import { OrganizationController } from './organization.controller';

describe('OrganizationController', () => {
    const organizationService: any = {create: () => {}};

    let organizationController: OrganizationController;

    beforeEach(() => {
        organizationController = new OrganizationController(organizationService);
    });

    it('should exist', () => {
        expect(organizationController).toBeDefined();
    });
});