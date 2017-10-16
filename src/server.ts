import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from './app/modules/common/pipes';
import { HttpExceptionFilter } from './app/modules/common/filters';

async function bootstrap() {

    const app: any = await NestFactory.create(ApplicationModule);

    app.use(bodyParser.json());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
