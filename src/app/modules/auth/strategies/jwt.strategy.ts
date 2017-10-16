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
                passReqToCallback: true,
                secretOrKey: 'secret',
            },
            async (req, payload, next) => await this.verify(req, payload, next)
        );

        passport.use(this);
    }

    public async verify(req, payload, done) {
        const user = await this.userService.find(payload.email);
        if (!user) {
            return done('Unauthorized', false);
        }
        done(null, user);
    }
}