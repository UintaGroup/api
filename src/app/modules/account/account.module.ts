import * as passport from 'passport';
import { Module, NestModule } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CommonModule } from '../common';
import { UserService } from './services';
import { AccountController, OrganizationController, UserController } from './controllers';
import { accountProviders } from './account.providers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { OrganizationSchema } from './schema/organization.schema';

@Module({
    imports: [
        // CommonModule,
        // MongooseModule.forFeature([
        //     {name: 'User', schema: UserSchema },
        //     {name: 'Organization', schema: OrganizationSchema },
        // ]),
    ],
    components: [...accountProviders],
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
