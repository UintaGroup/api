import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

export class InvalidArgumentException extends HttpException {
    constructor() {
        super('Invalid Argument', 422);
    }
}