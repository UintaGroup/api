// import * as passport from 'passport';
// import * as WindowsLiveStrategy from 'strategies-windowslive';
// import { Component, Inject } from '@nestjs/common';
// import { AuthService } from '../auth.service';
//
// @Component()
// export class JwtStrategy{
//     constructor(private readonly authService: AuthService) {
//         console.log('STRAT', WindowsLiveStrategy);
//         // super(
//         //   {
//         //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         //     passReqToCallback: true,
//         //     secretOrKey: 'secret',
//         //   },
//         //   async (req, payload, next) => await this.verify(req, payload, next)
//         // );
//         // strategies.use(this);
//     }
//
//     //
//     // public async verify(req, payload, done) {
//     //   const isValid = await this.authService.validateUser(payload);
//     //   if (!isValid) {
//     //     return done('Unauthorized', false);
//     //   }
//     //   done(null, payload);
//     // }
// }
