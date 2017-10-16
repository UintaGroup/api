import { Pipe } from '@nestjs/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces/pipe-transform.interface';
import { ValidationFailedException } from '../exceptions/validation-failed.exception';

@Pipe()
export class ParseIntPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new ValidationFailedException();
        }
        return value;
    }
}