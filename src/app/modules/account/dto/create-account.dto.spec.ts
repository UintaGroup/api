import { Validator } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';
import { plainToClass } from 'class-transformer';

describe('CreateAccountDto', () => {
    let _validator: any;
    let classUnderTest: CreateAccountDto;
    let req: any;

    beforeEach(() => {
        _validator = new Validator();

        req = {
            user: {
                firstName: 'Stone',
                lastName: 'Lasley',
                email: 'valid@email.com',
                password: '$xab1Tx1111',
            },
            organization: {
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
            },
        };
    });

    it('should initialize invalid', async () => {
        classUnderTest = plainToClass(CreateAccountDto, {});

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toBeGreaterThan(0);
    });

    it('should validate', async () => {
        classUnderTest = plainToClass(CreateAccountDto, req as object);

        const result = await _validator.validate(classUnderTest);

        expect(result.length).toEqual(0);
    });

    it('should validate nested user', async () => {
        delete req.user.email;
        classUnderTest = plainToClass(CreateAccountDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const error = result.find(errors => errors.property === 'user');

        expect(error.children.length).toEqual(1);
    });

    it('should validate nested organization', async () => {
        delete req.organization.email;
        classUnderTest = plainToClass(CreateAccountDto, req as object);

        const result = await _validator.validate(classUnderTest);
        const error = result.find(errors => errors.property === 'organization');

        expect(error.children.length).toEqual(1);
    });
});