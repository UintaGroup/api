import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
    constructor() {
        super('Conflict', HttpStatus.CONFLICT);
    }
}