import * as passport from 'passport';
import { Module, NestModule } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AccountController, OrganizationController } from './controllers';
import { accountProviders } from './account.providers';
import { UserModule } from '../user';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './schema/organization.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Organization', schema: OrganizationSchema}]), UserModule],
    components: [...accountProviders],
    controllers: [AccountController, OrganizationController],
})
export class AccountModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes(OrganizationController);
    }
}
