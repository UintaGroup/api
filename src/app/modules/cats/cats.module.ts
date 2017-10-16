import * as passport from 'passport';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';

@Module({
    modules: [DatabaseModule, CommonModule],
    controllers: [CatsController],
    components: [
        CatsService,
        ...catsProviders,
    ],
})
export class CatsModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes(CatsController);
    }
}
