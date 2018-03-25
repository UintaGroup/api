import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
    let module: TestingModule;
    let controller: UserController;

    const dto: any = {};
    const userId: string = 'abcd';
    const req: any =  {
        user: {
            id: 1,
        },
    };
    const userService: any = {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
    };

    beforeEach(() => {
        return Test.createTestingModule({
            controllers: [UserController],
            components: [{provide: UserService, useValue: userService}]
        })
         .compile()
         .then(compiledModule => module = compiledModule);
    });

    beforeEach(() => {
        controller = module.get(UserController);
    });

    it('should exist', () => {
        expect(controller).toBeDefined();
    });
});