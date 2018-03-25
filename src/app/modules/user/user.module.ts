import * as passport from 'passport';
import { Module, NestModule } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { UserService } from './services';
import { UserController } from './controllers';
import { userProviders } from './user.providers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    components: [...userProviders],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes(UserController);
    }
}
