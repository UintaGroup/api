import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { ExpenseReportService } from './expense-report.service';

describe('ExpenseReportService', () => {
    let module: TestingModule;
    let service: ExpenseReportService;
    let reportModel: any;

    beforeEach(async () => {
        reportModel = {
            findOne: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            save: jest.fn(),
        };
        module = await Test.createTestingModule({
            components: [
                ExpenseReportService,
                {provide: 'ExpenseReportModelToken', useValue: reportModel},
                {provide: 'ExpenseModelToken', useValue: {}},
            ],
        }).compile();

        service = module.get(ExpenseReportService);
    });

    it('should exists', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {

        const user: any = {};

        it('should find expenses by user', async () => {
            await service.findAll(user);
            expect(reportModel.find).toHaveBeenCalledWith({user});
            expect(reportModel.exec).toHaveBeenCalled();
        });

        it('should catch and rethrow MongoException', async () => {
            spyOn(reportModel, 'exec').and.throwError('Mongoose Error');
            try {
                await service.findAll(user);
            } catch (err) {
                expect(err.constructor.name).toEqual('MongoException');
            }
        });
    });

    describe('findOne', () => {

        const user: any = {};
        const id: any = 'a';

        it('should find expense by user and id', async () => {
            await service.findOne(user, id);
            expect(reportModel.findOne).toHaveBeenCalledWith({user, _id: id});
            expect(reportModel.exec).toHaveBeenCalled();
        });

        it('should catch and rethrow MongoException', async () => {
            spyOn(reportModel, 'exec').and.throwError('Mongoose Error');
            try {
                await service.findOne(user, id);
            } catch (err) {
                expect(err.constructor.name).toEqual('MongoException');
            }
        });
    });
});