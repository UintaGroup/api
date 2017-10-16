// import * as passport from 'passport';
// import { Strategy } from 'strategies-facebook';
// import { Component, Inject } from '@nestjs/common';
// import { AuthService } from '../auth.service';
//
// @Component()
// export class FacebookStrategy extends Strategy {
//     constructor(private readonly authService: AuthService) {
//         super({
//                 clientID: process.env.FACEBOOK_ID,
//                 clientSecret: process.env.FACEBOOK_SECRET,
//                 callbackURL: '/auth/facebook/callback',
//                 profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
//                 passReqToCallback: true,
//             },
//             async (req, payload, next) => await this.verify(req, payload, next),
//         );
//         strategies.use(this);
//     }
//
//     public async verify(req: any, payload: any, done: any) {
//         const isValid = await this.authService.validateUser(payload);
//         if (!isValid) {
//             return done('Unauthorized', false);
//         }
//         done(null, payload);
//     }
// }