import { Validator } from 'class-validator';
import { CreateOrganizationDto } from './create-organization.dto';
import { plainToClass } from 'class-transformer';

describe('CreateOrganizationDto', () => {
    let _validator: any;
    let classUnderTest: CreateOrganizationDto;
    let req: any;

    beforeEach(() => {
        _validator = new Validator();

        req = {
            name: 'Uinta Software',
            address: '123 Uinta St.',
            addressTwo: 'Suite B.',
            city: 'Park City',
            state: 'UT',
            postalCode: '84060',
            country: 'USA',
            email: 'valid@email.com',
            phone: '435-111-2222',
            companySite: 'www.uintasoft.com',
        };
    });

    it('should initialize in invalid state', async () => {
        classUnderTest = plainToClass(CreateOrganizationDto, {});

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toBeGreaterThan(0);
    });

    it('should validate', async () => {
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce name requirement', async () => {
        delete req.name;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'name');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce address requirement', async () => {
        delete req.address;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'address');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should not enforce addressTwo requirement', async () => {
        delete req.addressTwo;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce city requirement', async () => {
        delete req.city;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'city');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce state requirement', async () => {
        delete req.state;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'state');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce state length', async () => {
        req.state = 'A';
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'state');

        expect(validationError.constraints.length).toBeDefined();
    });

    it('should enforce state upperCase', async () => {
        req.state = 'ut';
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'state');

        expect(validationError.constraints.isUppercase).toBeDefined();
    });

    it('should enforce postalCode requirement', async () => {
        delete req.postalCode;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'postalCode');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce postalCode minLength', async () => {
        req.postalCode = '1235';
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'postalCode');

        expect(validationError.constraints.minLength).toBeDefined();
    });

    it('should enforce country requirement', async () => {
        delete req.country;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'country');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce country length', async () => {
        req.country = 'US';
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'country');

        expect(validationError.constraints.length).toBeDefined();
    });

    it('should enforce country upperCase', async () => {
        req.country = 'usa';
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'country');

        expect(validationError.constraints.isUppercase).toBeDefined();
    });

    it('should enforce email requirement', async () => {
        delete req.email;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'email');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should enforce valid email', async () => {
        req.email = 'invalid@emailcom';
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'email');

        expect(validationError.constraints.isEmail).toBeDefined();
    });

    it('should enforce phone requirement', async () => {
        delete req.phone;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'phone');

        expect(validationError.constraints.isNotEmpty).toBeDefined();
    });

    it('should not enforce companySite requirement', async () => {
        delete req.companySite;
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should enforce companySite fqdn', async () => {
        req.companySite = 'invaliddomaincom';
        classUnderTest = plainToClass(CreateOrganizationDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const validationError: any = result.find(validErr => validErr.property === 'companySite');

        expect(validationError.constraints.isFqdn).toBeDefined();
    });

});