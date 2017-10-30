import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

// TODO - I dislike this
export class MongoException extends HttpException {
    constructor(private _rawMongoException: any) {
        super(MongoException.parseType(_rawMongoException), MongoException.parseStatus(_rawMongoException));
    }

    private static parseType(mErr: any): string {
        switch (mErr.code) {
            case 11000:
                return 'Conflict';
            default:
                return 'Unhandled Exception';
        }
    }

    private static parseStatus(mErr: any): number {
        switch (mErr.code) {
            case 11000:
                return HttpStatus.CONFLICT;
            default:
                return 500;
        }

    }
}