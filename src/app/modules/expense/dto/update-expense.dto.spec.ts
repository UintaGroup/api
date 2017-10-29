import { Validator } from 'class-validator';
import { UpdateExpenseDto } from './update-expense.dto';
import { plainToClass } from 'class-transformer';

describe('UpdateExpenseDto', () => {
    let _validator: any;
    let classUnderTest: UpdateExpenseDto;
    let req: any;

    beforeEach(() => {
        _validator = new Validator();
        req = {
            amount: 500.00,
            description: ' Description',
            expenseDate: '2017-01-07T00:00:00.000',
            expenseCategoryId: '59e7e2b777e0253e14970032',
            merchant: 'BestBuy',
        };
    });

    it('should validate', async () => {

        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should not enforce amount requirement', async () => {
        delete req.amount;
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce positive amount', async () => {
        req.amount = -5;
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'amount');

        expect(validationError.constraints.isPositive).toBeDefined();
    });

    it('should not enforce description requirement', async () => {
        delete req.description;
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should not enforce expenseDate requirement', async () => {
        delete req.expenseDate;
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce expenseDate type', async () => {
        req.expenseDate = 'INVALIDDATE';
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'expenseDate');

        expect(validationError.constraints.isDateString).toBeDefined();
    });

    it('should not enforce expenseCategoryId required', async () => {
        delete req.expenseCategoryId;
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce expenseCategoryId type', async () => {
        req.expenseCategoryId = 'abcdef';
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'expenseCategoryId');

        expect(validationError.constraints.isMongoId).toBeDefined();
    });

    it('should not enforce merchange required', async () => {
        delete req.merchant;
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce expenseCategoryId type', async () => {
        req.merchant = 5;
        classUnderTest = plainToClass(UpdateExpenseDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'merchant');

        expect(validationError.constraints.isString).toBeDefined();
    });
});