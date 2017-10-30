import { Validator } from 'class-validator';
import { CreateExpenseCategoryDto } from './create-expense-category.dto';
import { plainToClass } from 'class-transformer';

describe('CreateExpenseCategoryDto', () => {
    let _validator: any;
    let classUnderTest: CreateExpenseCategoryDto;
    let req: any;

    beforeEach(() => {
        _validator = new Validator();
        req = {
            name: 'Category One',
            description: 'Category Description',
            sourceSystemId: '123',
        };
    });

    it('should validate', async () => {

        classUnderTest = plainToClass(CreateExpenseCategoryDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should initialize in invalid state', async () => {
        classUnderTest = plainToClass(CreateExpenseCategoryDto, {});

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toBeGreaterThan(0);
    });

    it('should enforce name requirement', async () => {
        delete req.name ;
        classUnderTest = plainToClass(CreateExpenseCategoryDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'name');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should not enforce description requirement', async () => {
        delete req.description;
        classUnderTest = plainToClass(CreateExpenseCategoryDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should not enforce sourceSystemId requirement', async () => {
        delete req.sourceSystemId;
        classUnderTest = plainToClass(CreateExpenseCategoryDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });
});