import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component } from '@nestjs/common';
import { JwtService } from '../services';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly jwtService: JwtService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.UINTA_SECRET,
            },
            async (payload, next) => await this.jwtService.verify(payload, next),
        );
        passport.use(this);
    }
}