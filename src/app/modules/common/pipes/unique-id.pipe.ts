import { HttpException } from '@nestjs/core';
import { Pipe, HttpStatus } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces/pipe-transform.interface';
import * as mongoose from 'mongoose';

@Pipe()
export class UniqueIdPipe implements PipeTransform<string> {
    constructor(private _fieldName: string) {}
    async transform(value: string, metadata: ArgumentMetadata) {
        console.log('comparing value', value, 'WHich is a: ', this._fieldName);
        return value;
    }
}