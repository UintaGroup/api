import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component } from '@nestjs/common';
import { UserService } from '../../account/services/user.service';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly userService: UserService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'secret',
            },
            async (payload, next) => await this.verify(payload, next)
        );

        passport.use(this);
    }

    public async verify(payload, done) {
        const user = await this.userService.find(payload.email);
        if (!user) {
            return done('Unauthorized', false);
        }
        done(null, user);
    }
}