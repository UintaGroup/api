import { ExpenseReportController } from './expense-report.controller';

describe('ExpenseReportController', () => {
    let expenseReportController: ExpenseReportController;

    const expenseReportService: any = {create: jest.fn()};

    beforeEach(() => {
        expenseReportController = new ExpenseReportController(expenseReportService);
    });

    it('should exist', () => {
        expect(expenseReportController).toBeDefined();
    });
});