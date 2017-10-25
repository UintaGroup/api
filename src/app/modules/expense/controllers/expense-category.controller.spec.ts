import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { ExpenseCategoryService } from '../services/expense-category.service';
import { ExpenseCategoryController } from './expense-category.controller';

describe('ExpenseCategoryController', () => {
    let module: TestingModule;
    let controller: ExpenseCategoryController;

    const expenseCategoryService: any = {create: jest.fn()};

    beforeEach(() => {
        return Test.createTestingModule({
            controllers: [ExpenseCategoryController],
            components: [{provide: ExpenseCategoryService, useValue: expenseCategoryService}],
        })
            .compile()
            .then(compiledModule => module = compiledModule);
    });

    beforeEach(() => {
        controller = module.get(ExpenseCategoryController);
    });

    it('should exist', () => {
        expect(controller).toBeDefined();
    });
});