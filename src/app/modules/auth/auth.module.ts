import * as passport from 'passport';
import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService, JwtService } from './services';
import { AuthController } from './auth.controller';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { CommonModule } from '../common';
import { DatabaseModule } from '../database';
import { JwtStrategy } from './strategies';
import { AccountModule } from '../account';

@Module({
    modules: [DatabaseModule, CommonModule, AccountModule],
    components: [AuthService, JwtService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes({path: '/auth', method: RequestMethod.GET});
    }
}
