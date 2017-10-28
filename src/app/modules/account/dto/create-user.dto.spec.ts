import { Validator } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { plainToClass } from 'class-transformer';

describe('CreateUserDto', () => {
    let _validator: any;
    let classUnderTest: CreateUserDto;
    let req: any;

    beforeEach(() => {
        _validator = new Validator();
        req = {
            email: 'valid@email.com',
            password: '$xab1Tx1111',
        } as object;
    });

    it('should initialize in invalid state', async () => {
        classUnderTest = plainToClass(CreateUserDto, {});

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toBeGreaterThan(0);
    });

    it('should enforce password requirement', async () => {
        delete req.password;
        classUnderTest = plainToClass(CreateUserDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'password');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should validate', async () => {

        classUnderTest = plainToClass(CreateUserDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce password minimum length', async () => {
        req.password = '$xab1Tx',
            classUnderTest = plainToClass(CreateUserDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'password');

        expect(validationError.constraints.minLength).toBeDefined();
    });

    it('should enforce password maximum length', async () => {
        req.password = '!$1b11111111111111111';
        classUnderTest = plainToClass(CreateUserDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'password');

        expect(validationError.constraints.maxLength).toBeDefined();
    });

    it('should enforce email requirement', async () => {
        delete req.email;
        classUnderTest = plainToClass(CreateUserDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'email');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce email validity', async () => {
        req.email = 'invalid@emailcom';
        classUnderTest = plainToClass(CreateUserDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'email');

        expect(validationError.constraints.isEmail).toBeDefined();
    });

});