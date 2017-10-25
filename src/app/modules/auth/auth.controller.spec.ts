import { AuthController } from './auth.controller';

describe('AuthController', () => {
    let authController: AuthController;

    const authService: any = {authenticate: jest.fn()};
    const loginDto: any = {email: '', password: ''};

    beforeEach(() => {
        authController = new AuthController(authService);
    });

    it('should exist', () => {
        expect(authController).toBeDefined();
    });

    describe('login', () => {
        it('should authenticate user with posted credentials', async () => {

            await authController.login(loginDto);
            expect(authService.authenticate).toHaveBeenCalledWith(loginDto.email, loginDto.password);
        });
    });
});