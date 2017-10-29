import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions';
import { Catch } from '@nestjs/common';
import { HttpValidationException } from '../exceptions/http-validation.exception';

@Catch(HttpValidationException)
export class HttpValidationExceptionFilter implements ExceptionFilter {
    catch(exception: HttpValidationException, response) {
        const statusCode = exception.getStatus();
        const message = exception.getResponse();
        const errors = exception.getMessage();

        response.status(statusCode).json({
            statusCode,
            message,
            errors,
        });
    }
}