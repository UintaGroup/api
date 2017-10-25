import { ExpenseCategoryController } from './expense-category.controller';

describe('ExpenseCategoryController', () => {
    let expenseCategoryController: ExpenseCategoryController;

    const expenseCategoryService: any = {create: jest.fn()};

    beforeEach(() => {
        expenseCategoryController = new ExpenseCategoryController(expenseCategoryService);
    });

    it('should exist', () => {
        expect(expenseCategoryController).toBeDefined();
    });
});