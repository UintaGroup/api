import { HttpException } from '@nestjs/core';
import { Pipe, HttpStatus } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces/pipe-transform.interface';

@Pipe()
export class PublicEntityPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        console.log('LOOKING AT ENTITY', value);
        return value;
    }
}