// import * as passport from 'passport';
// import { IStrategyOptionsWithRequest, Strategy } from 'strategies-local';
// import { Component, Inject } from '@nestjs/common';
// import { AuthService } from '../auth.service';
//
// @Component()
// export class LocalStrategy extends Strategy {
//     constructor(private readonly authService: AuthService) {
//         super({ usernameField: 'email'} as IStrategyOptionsWithRequest ,
//             async (email, password, done) => await this.verify(email, password, done),
//         );
//         strategies.use(this);
//     }
//
//     public async verify(email, password, done) {
//         const isValid = await this.authService.validateLocalUser(email, password);
//         if (!isValid) {
//             return done('Unauthorized', false);
//         }
//         done(email);
//     }
// }