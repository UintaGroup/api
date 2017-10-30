import { Validator } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CredentialsDto } from './credentials.dto';

describe('CreateExpenseDto', () => {
    let _validator: any;
    let classUnderTest: CredentialsDto;
    let req: any;

    beforeEach(() => {
        _validator = new Validator();
        req = {
            email: 'use@email.com',
            password: '1234569',
        };
    });

    it('should validate', async () => {

        classUnderTest = plainToClass(CredentialsDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should initialize in invalid state', async () => {
        classUnderTest = plainToClass(CredentialsDto, {});

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toBeGreaterThan(0);
    });

    it('should enforce email requirement', async () => {
        delete req.email;
        classUnderTest = plainToClass(CredentialsDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'email');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce email type', async () => {
        req.email = 123456;
        classUnderTest = plainToClass(CredentialsDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'email');

        expect(validationError.constraints.isEmail).toBeDefined();
    });

    it('should enforce password requirement', async () => {
        delete req.password;
        classUnderTest = plainToClass(CredentialsDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'password');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });
});