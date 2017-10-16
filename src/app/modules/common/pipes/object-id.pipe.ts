import * as mongoose from 'mongoose';
import { Pipe } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces/pipe-transform.interface';
import { InvalidIdException } from '../exceptions/invalid-id.exception';

@Pipe()
export class ObjectIdPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const valid = mongoose.Types.ObjectId.isValid(value);
        if (!valid) {
            throw new InvalidIdException();
        }
        return value;
    }
}