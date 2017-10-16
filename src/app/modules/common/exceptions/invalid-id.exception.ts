import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

export class InvalidIdException extends HttpException {
    constructor() {
        super('Invalid Id', HttpStatus.BAD_REQUEST);
    }
}