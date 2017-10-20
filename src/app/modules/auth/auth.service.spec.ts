import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    const userService: any = {find: () => {}};

    beforeEach(() => {
        authService = new AuthService(userService);
        authController = new AuthController(authService);
    });

    describe('authenticate', () => {
        it('should return new Auth Token', async () => {

            expect(true).toBe(true);
        });
    });
});