import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/app/modules/auth/auth.module';
import { AuthService, JwtService } from '../../src/app/modules/auth/services';
import { AuthToken } from '../../src/app/modules/auth/models/auth-token.model';
import { JwtServiceMock } from './mocks/jwt.service.mock';

describe('Auth', () => {
    const testToken = new AuthToken({}, 360);
    const server = express();
    server.use(bodyParser.json());

    const loginResult = {
        token: testToken.token,
        expiration: 3600,
    };
    const authService = {authenticate: () => loginResult};

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            modules: [AuthModule],
        })
            .overrideComponent(JwtService).useValue(new JwtServiceMock(testToken))
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
            .set('Authorization', 'Bearer ' + testToken.token)
            .expect(200);
    });
});