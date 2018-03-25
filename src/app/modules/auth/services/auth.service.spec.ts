import { Test } from '@nestjs/testing';
import { UserService } from '../../account/services';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../account/interfaces';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';

describe('AuthService', () => {
    let userService: UserService;
    let authService: AuthService;
    let bcryptService: BcryptService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            components: [
                AuthService,
                UserService,
                JwtService,
                BcryptService,
                {
                    provide: 'UserSchemaModel',
                    useValue: {
                        save: jest.fn(),
                    },
                },
            ],
        })
            .overrideComponent(UserService).useValue({
                findOne: jest.fn().mockReturnValue(Promise.resolve({})),
            })
            .compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
        bcryptService = module.get<BcryptService>(BcryptService);
    });

    describe('validateUser', () => {

        it('should return void if user', () => {
            expect(authService.validateUser({} as User)).toBeUndefined();
        });

        it('should throw exception if no user', () => {
            expect(() => authService.validateUser()).toThrow(UnauthorizedException);
        });
    });

    describe('validatePassword', () => {
        const invalid = 'invalid';
        const password = 'password';

        it('should return void if match', async () => {
            jest.spyOn(bcryptService, 'compareSync').mockImplementation(() => true);
            expect(authService.validatePassword('password', password)).toBeUndefined();
        });

        it('should throw exception if no match', () => {
            jest.spyOn(bcryptService, 'compareSync').mockImplementation(() => false);
            expect(() => authService.validatePassword(invalid, password)).toThrow(UnauthorizedException);
        });
    });
});