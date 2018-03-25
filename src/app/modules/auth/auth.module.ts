import * as passport from 'passport';
import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CommonModule } from '../common';
import { AccountModule } from '../account';
import { authProviders } from './auth.providers';
import { UserModule } from '../user';

@Module({
    imports: [CommonModule, AccountModule, UserModule],
    components: [...authProviders],
    controllers: [AuthController],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes({path: '/auth', method: RequestMethod.GET});
    }
}
