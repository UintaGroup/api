import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user/services';
import { IJwt } from '../interfaces';

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

    public verifyToken(token: string): Promise<IJwt> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.UINTA_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

}