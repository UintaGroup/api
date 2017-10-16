import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

export class ValidationFailedException extends HttpException {
    constructor() {
        super('Validation failed', HttpStatus.BAD_REQUEST);
    }
}