import * as passport from 'passport';
import {
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CommonModule } from '../common';
import { DatabaseModule } from '../database';
import { AccountService, OrganizationService, UserService } from './services';
import { AccountController, OrganizationController, UserController } from './controllers';
import { accountProviders } from './account.providers';

@Module({
    modules: [DatabaseModule, CommonModule],
    components: [UserService, AccountService, OrganizationService, ...accountProviders],
    controllers: [AccountController, UserController, OrganizationController],
    exports: [UserService],
})
export class AccountModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes(OrganizationController, UserController);
    }
}
