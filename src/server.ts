import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from './app/modules/common/pipes';
import { HttpExceptionFilter } from './app/modules/common/filters';
import { RolesGuard } from './app/modules/auth/guards';

async function bootstrap() {

    const app: any = await NestFactory.create(ApplicationModule);
    app.use(express.static(__dirname + '/public'));

    app.use(bodyParser.json());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalGuards(RolesGuard);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
