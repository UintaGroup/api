import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
jest.mock('../services/expense-report.service');
import { ExpenseReportService } from '../services';
import { ExpenseReportController } from './expense-report.controller';
import { ReportStatus } from '../enum/status.enum';

describe('ExpenseReportController', () => {
    let module: TestingModule;
    let controller: ExpenseReportController;
    let service: ExpenseReportService;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [ExpenseReportController],
            components: [ExpenseReportService],
        }).compile();

        controller = module.get(ExpenseReportController);
        service = module.get(ExpenseReportService);
    });

    it('should exist', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    describe('approve', () => {
        it('should transition report to Approved', async () => {
            // TODO controller method parameters
            await controller.approve('', '');
            expect(service.transition).toHaveBeenCalledWith(undefined, '', ReportStatus.Approved);
        });
    });

    describe('paid', () => {
        it('should transition report to Paid', async () => {
            await controller.paid('', '');
            expect(service.transition).toHaveBeenCalledWith(undefined, '', ReportStatus.Paid);
        });
    });

    describe('submit', () => {
        it('should transition report to Submitted', async () => {
            await controller.submit('', '');
            expect(service.transition).toHaveBeenCalledWith(undefined, '', ReportStatus.Submitted);
        });
    });

    describe('decline', () => {
        it('should transition report to Declined', async () => {
            await controller.decline('', '');
            expect(service.transition).toHaveBeenCalledWith(undefined, '', ReportStatus.Declined);
        });
    });
});