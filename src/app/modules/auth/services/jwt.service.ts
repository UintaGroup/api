import { Component } from '@nestjs/common';
import { UserService } from '../../account/services';
import { ExtractJwt } from 'passport-jwt';

@Component()
export class JwtService {
    constructor(private readonly userService: UserService) {
    }

    public fromAuthHeaderAsBearerToken(): any {
        return ExtractJwt.fromAuthHeaderAsBearerToken();
    }

    public async verify(payload, done) {
        const user = await this.userService.findByEmail(payload.email);
        if (!user) {
            return done('Unauthorized', false);
        }
        done(null, user);
    }
}