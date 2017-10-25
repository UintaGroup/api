import { AccountController } from './account.controller';

describe('AccountController', () => {
    let accountController: AccountController;

    const dto: any = {};
    const accountService: any = {create: jest.fn()};

    beforeEach(() => {
        accountController = new AccountController(accountService);
    });

    it('should exist', () => {
        expect(accountController).toBeDefined();
    });

    describe('create', () => {
        it('should create user with posted value', async () => {
            await accountController.create(dto);
            expect(accountService.create).toHaveBeenCalledWith(dto);
        });
    });
});