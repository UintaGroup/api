import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtService } from '../../src/app/modules/auth/services';
import { AuthToken } from '../../src/app/modules/auth/models/auth-token.model';
import { JwtServiceMock } from '../../src/app/modules/auth/services/mocks';
import { ExpenseCategoryService } from '../../src/app/modules/expense/services';
import { ExpenseModule } from '../../src/app/modules/expense/expense.module';

describe('ExpenseCategory', () => {
    const testToken = new AuthToken({}, 360);
    const server = express();
    server.use(bodyParser.json());

    const reports: any[] = [];
    const report: any = {};
    const service = {
        findAll: () => reports,
        findOne: () => report,
        create: () => report,
    };
    const jwtService = new JwtServiceMock(testToken);

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            modules: [ExpenseModule],
        })
            .overrideComponent(JwtService).useValue(jwtService)
            .overrideComponent(ExpenseCategoryService).useValue(service)
            .compile();

        const app = module.createNestApplication(server);
        await app.init();
    });

    it(`/Get findAll`, () => {
        return request(server)
            .get('/expenses/categories')
            .set('Authorization', 'Bearer ' + testToken.token)
            .expect(reports)
            .expect(200);
    });

    it(`/Get findOne requires valid id`, () => {
        return request(server)
            .get('/expenses/categories/abcdefghi')
            .set('Authorization', 'Bearer ' + testToken.token)
            .expect(400);
    });

    it(`/Get findOne`, () => {
        return request(server)
            .get('/expenses/categories/59dea7d31274232a84d4fbad')
            .set('Authorization', 'Bearer ' + testToken.token)
            .expect(report)
            .expect(200);
    });

    it(`/Post create`, () => {
        return request(server)
            .post('/expenses/categories')
            .set('Authorization', 'Bearer ' + testToken.token)
            .send({
               name: 'test',
               description: '',
               sourceSystmeId: '',
            })
            .expect(report)
            .expect(201);
    });
});