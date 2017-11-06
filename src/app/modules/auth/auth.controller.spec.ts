import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
    let module: TestingModule;
    let controller: AuthController;

    const authService: any = {authenticate: jest.fn()};
    const loginDto: any = {email: '', password: ''};

    beforeEach(() => {
        return Test.createTestingModule({
            controllers: [AuthController],
            components: [{provide: AuthService, useValue: authService}],
        })
            .compile()
            .then(compiledModule => module = compiledModule);
    });

    beforeEach(() => {
        controller = module.get(AuthController);
    });

    describe('login', () => {

        it('should authenticate user with posted credentials', async () => {
            await controller.login(loginDto);
            expect(authService.authenticate).toHaveBeenCalledWith(loginDto.email, loginDto.password);
        });

    });
});