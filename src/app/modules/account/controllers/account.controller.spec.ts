import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { AccountService } from '../services/account.service';
import { AccountController } from './account.controller';

describe('AccountController', () => {
    let module: TestingModule;
    let controller: AccountController;

    const dto: any = {};
    const accountService: any = {create: jest.fn()};

    beforeEach(() => {
        return Test.createTestingModule({
            controllers: [AccountController],
            components: [{provide: AccountService, useValue: accountService}]
        })
         .compile()
         .then(compiledModule => module = compiledModule);
    });

    beforeEach(() => {
        controller = module.get(AccountController);
    });

    it('should exist', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create user with posted value', async () => {
            await controller.create(dto);
            expect(accountService.create).toHaveBeenCalledWith(dto);
        });
    });
});