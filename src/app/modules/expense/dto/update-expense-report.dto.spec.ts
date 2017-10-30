import { Validator } from 'class-validator';
import { UpdateExpenseReportDto } from './update-expense-report.dto';
import { plainToClass } from 'class-transformer';

describe('UpdateExpenseReportDto', () => {
    let _validator: any;
    let classUnderTest: UpdateExpenseReportDto;
    let req: any;

    beforeEach(() => {
        _validator = new Validator();
        req = {
            name: 'Report One',
            description: 'Report Description',
            startDate: '2017-01-07T00:00:00.000',
            endDate: '2017-02-07T00:00:00.000',
            expenses: [
                {
                    amount: 1000.00,
                    description: 'Expense Description',
                    expenseDate: '2017-01-07T00:00:00.000',
                    expenseCategoryId: '59e7e2b777e0253e14970032',
                    merchant: 'BestBuy',
                },
                {
                    amount: 5.99,
                    description: '',
                    expenseDate: '2017-01-06T00:00:00.000',
                    expenseCategoryId: '59e7e2d777e0253e14970033',
                    merchant: 'NewEgg',
                },
            ],
        };
    });

    it('should validate', async () => {

        classUnderTest = plainToClass(UpdateExpenseReportDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should not enforce name requirement', async () => {
        delete req.name ;
        classUnderTest = plainToClass(UpdateExpenseReportDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should not enforce description requirement', async () => {
        delete req.description;
        classUnderTest = plainToClass(UpdateExpenseReportDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should not enforce startDate requirement', async () => {
        delete req.startDate;
        classUnderTest = plainToClass(UpdateExpenseReportDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce startDate type', async () => {
        req.startDate = 'INVALIDDATE';
        classUnderTest = plainToClass(UpdateExpenseReportDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'startDate');

        expect(validationError.constraints.isDateString).toBeDefined();
    });

    it('should not enforce endDate requirement', async () => {
        delete req.endDate;
        classUnderTest = plainToClass(UpdateExpenseReportDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce endDate type', async () => {
        req.endDate = 123;
        classUnderTest = plainToClass(UpdateExpenseReportDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'endDate');

        expect(validationError.constraints.isDateString).toBeDefined();
    });
});