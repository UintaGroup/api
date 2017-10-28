import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/app/modules/auth/auth.module';
import { AuthService } from '../../src/app/modules/auth/auth.service';

describe('Auth', () => {
    const server = express();
    server.use(bodyParser.json());

    const loginResult = {
        token: 'abcdef',
        expiration: 3600,
    };
    const authService = {authenticate: () => loginResult};

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            modules: [AuthModule],
        })
            .overrideComponent(AuthService).useValue(authService)
            .compile();

        const app = module.createNestApplication(server);
        await app.init();
    });

    it(`/Post auth`, () => {
        return request(server)
            .post('/auth')
            .send({
                email: 'user@user.com',
                password: 'password',
            })
            .expect(201)
            .expect(loginResult);
    });

    it(`/Get auth`, () => {
        return request(server)
            .get('/auth')
            .expect(401);
    });
});