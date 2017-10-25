import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { ExpenseReportService } from '../services';
import { ExpenseReportController } from './expense-report.controller';

describe('ExpenseReportController', () => {
    let module: TestingModule;
    let controller: ExpenseReportController;

    const expenseReportService: any = {create: jest.fn()};

    beforeEach(() => {
        return Test.createTestingModule({
            controllers: [ExpenseReportController],
            components: [{provide: ExpenseReportService, useValue: expenseReportService}]
        })
            .compile()
            .then(compiledModule => module = compiledModule);
    });

    beforeEach(() => {
        controller = module.get(ExpenseReportController);
    });

    it('should exist', () => {
        expect(controller).toBeDefined();
    });
});