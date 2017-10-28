import { Validator } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { plainToClass } from 'class-transformer';

describe('CreateUserDto', () => {
    let _validator: any;
    let classUnderTest: CreateUserDto;

    beforeEach(() => {
        _validator = new Validator();
    });

    it('should initialize in invalid state', async () => {
        classUnderTest = plainToClass(CreateUserDto, {});

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toBeGreaterThan(0);
    });

    it('should enforce password requirement', async () => {
        const req = {
            email: 'valid@email.com',
        };
        classUnderTest = plainToClass(CreateUserDto, req);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'password');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should validate', async () => {
        const req = {
            email: 'valid@email.com',
            password: '$xab1Tx1111',
        };
        classUnderTest = plainToClass(CreateUserDto, req);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce password minimum length', async () => {
        const req = {
            email: 'valid@email.com',
            password: '$xab1Tx',
        };
        classUnderTest = plainToClass(CreateUserDto, req);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'password');

        expect(validationError.constraints.minLength).toBeDefined();
    });

    it('should enforce password maximum length', async () => {
        const req = {
            email: 'valid@email.com',
            password: '!$1b11111111111111111',
        };
        classUnderTest = plainToClass(CreateUserDto, req);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'password');

        expect(validationError.constraints.maxLength).toBeDefined();
    });

    it('should enforce email requirement', async () => {
        const req = {
            password: '!$1b1111111111111111',
        };
        classUnderTest = plainToClass(CreateUserDto, req);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'email');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce email validity', async () => {
        const req = {
            email: 'invalid@emailcom',
            password: '!$1b1111111111111111',
        };
        classUnderTest = plainToClass(CreateUserDto, req);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'email');

        expect(validationError.constraints.isEmail).toBeDefined();
    });

});