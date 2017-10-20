import { HttpException } from '@nestjs/core';

export class HttpExceptionEnhanced extends  HttpException {

    constructor(response: string | object, status: number, private message: string) {
        super(response, status);
    }

    getMessage(): string {
        return this.message;
    }
}