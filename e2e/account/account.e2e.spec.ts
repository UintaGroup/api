import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AccountModule } from '../../src/app/modules/account';
import { AccountService, OrganizationService } from '../../src/app/modules/account/services';
import { UserService } from '../../src/app/modules/user/services';

describe('Account', () => {
    const server = express();
    server.use(bodyParser.json());

    const newAccount = {
        user: {},
        organization: {},
    };
    const accountService = {create: () => newAccount};
    const organizationService = {};
    const userService = {};

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            modules: [AccountModule],
        })
            .overrideComponent(AccountService).useValue(accountService)
            .overrideComponent(UserService).useValue(userService)
            .overrideComponent(OrganizationService).useValue(organizationService)
            .compile();

        const app = module.createNestApplication(server);
        await app.init();
    });

    it(`/Post accounts`, () => {
        return request(server)
            .post('/accounts')
            .send({
                user: {
                    email: 'user@user.com',
                    password: 'password',
                },
                organization: {name: 'business'},
            })
            .expect(201)
            .expect(newAccount);
    });
});