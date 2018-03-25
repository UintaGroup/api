import * as bcrypt from 'bcrypt-nodejs';
import { Component } from '@nestjs/common';

@Component()
export class BcryptService {

    compareSync(candidatePassword: string, password: string): boolean {
        return bcrypt.compareSync(candidatePassword, password);
    }
}