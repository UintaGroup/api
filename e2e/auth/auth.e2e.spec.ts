import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/app/modules/auth/auth.module';
import { AuthService, JwtService } from '../../src/app/modules/auth/services';
import { AuthToken } from '../../src/app/modules/auth/models/auth-token.model';
import { JwtServiceMock } from '../../src/app/modules/auth/services/mocks';

describe('Auth', () => {
    const testToken = new AuthToken({}, 360);
    const server = express();
    server.use(bodyParser.json());

    const loginResult = {
        token: testToken.token,
        expiration: 3600,
    };
    const resetResult = {};
    const authService = {
        authenticate: () => loginResult,
        resetPassword: () => resetResult,
        setPassword: () => {},
    };

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

    it(`/Get password-reset`, () => {
        return request(server)
            .get('/auth/password-reset/sclarklasley@gmail.com')
            .expect(200)
            .expect(resetResult);
    });

    it(`/Post password-reset`, () => {
        return request(server)
            .post('/auth/password-reset')
            .send({
               password: 'Pa$$word123',
               token: testToken.token,
            })
            .expect(201);
    });
});