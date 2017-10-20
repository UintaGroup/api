import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions';
import { Catch } from '@nestjs/common';
import { HttpException } from '../exceptions';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, response) {
        const status = exception.getStatus();
        const msg = exception.getResponse();

        response.status(status).json({
            statusCode: status,
            message: msg,
        });
    }
}