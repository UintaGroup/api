import { HttpException } from '@nestjs/core';

export class InvalidArgumentException extends HttpException {
    constructor() {
        super('Invalid Argument', 422);
    }
}