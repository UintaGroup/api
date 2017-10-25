import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { OrganizationService } from '../services';
import { OrganizationController } from './organization.controller';

describe('OrganizationController', () => {
    let module: TestingModule;
    const organizationService: any = {create: () => {}};

    let controller: OrganizationController;

    beforeEach(() => {
        return Test.createTestingModule({
            controllers: [OrganizationController],
            components: [{provide: OrganizationService, useValue: organizationService}]
        })
            .compile()
            .then(compiledModule => module = compiledModule);
    });

    beforeEach(() => {
        controller = module.get(OrganizationController);
    });

    it('should exist', () => {
        expect(controller).toBeDefined();
    });
});