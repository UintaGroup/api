import * as bcrypt from 'bcrypt-nodejs';
import { Component } from '@nestjs/common';
import { UserService } from '../account';
import { AuthToken } from './models';
import { IAuthToken } from './interfaces';
import { UnauthorizedException } from '../common/exceptions';
import { SetPasswordDto } from '../account/dto/set-password.dto';
import { IJwt } from './interfaces/jwt.interface';
import { InvalidArgumentException } from '../common/exceptions/invalid-argument.exception';

@Component()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    async authenticate(email, password): Promise<any> {
        return await this.userService.find(email)
            .then(user => {
                this.validateUser(user);
                this.validatePassword(password, user.password);
                return new AuthToken('secret', {email: user.email}, 3600);
            });
    }

    async validateFacebookUser(req: any, accessToken: any, refreshToken: any, profile: any, done: any): Promise<boolean> {
        return Promise.resolve(true);
        // if (req.user) {
        //     User.findOne({facebook: profile.id}, (err, existingUser) => {
        //         if (err) {
        //             return done(err);
        //         }
        //         if (existingUser) {
        //             // req.flash('errors', {msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.'});
        //             done(err);
        //         } else {
        //             User.findById(req.user.id, (error: Error, user: any) => {
        //                 if (error) {
        //                     return done(error);
        //                 }
        //                 user.facebook = profile.id;
        //                 user.tokens.push({kind: 'facebook', accessToken});
        //                 user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
        //                 user.profile.gender = user.profile.gender || profile._json.gender;
        //                 user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
        //                 user.save((err: Error) => {
        //                     req.flash('info', {msg: 'Facebook account has been linked.'});
        //                     done(err, user);
        //                 });
        //             });
        //         }
        //     });
        // } else {
        //     User.findOne({facebook: profile.id}, (err, existingUser) => {
        //         if (err) {
        //             return done(err);
        //         }
        //         if (existingUser) {
        //             return done(undefined, existingUser);
        //         }
        //         User.findOne({email: profile._json.email}, (err, existingEmailUser) => {
        //             if (err) {
        //                 return done(err);
        //             }
        //             if (existingEmailUser) {
        //                 req.flash('errors', {msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.'});
        //                 done(err);
        //             } else {
        //                 const user: any = new User();
        //                 user.email = profile._json.email;
        //                 user.facebook = profile.id;
        //                 user.tokens.push({kind: 'facebook', accessToken});
        //                 user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
        //                 user.profile.gender = profile._json.gender;
        //                 user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
        //                 user.profile.location = (profile._json.location) ? profile._json.location.name : '';
        //                 user.save((err: Error) => {
        //                     done(err, user);
        //                 });
        //             }
        //         });
        //     });
        // }
    }

    async resetPassword(email: string): Promise<any> {
        // TODO - Send email to user account with token
        let resetToken: IAuthToken = new AuthToken('secret', {email: email}, 86400);
        console.log('PASSWORD RESET', resetToken.token);
        await this.userService.find(email)
            .then(user => {
                this.validateUser(user);
                user.passwordResetToken = resetToken.token;
                user.save();
            });
    }

    async setPassword(setPasswordDto: SetPasswordDto): Promise<void> {
        try {
            await AuthToken.verify(setPasswordDto.token)
                .then((token: IJwt) => this.userService.findOne({
                    email: token.email,
                    passwordResetToken: setPasswordDto.token
                }))
                .then(user => {
                    this.validateUser(user);
                    user.passwordResetToken = '';
                    user.password = setPasswordDto.password;
                    user.save();
                });
        }
        catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new InvalidArgumentException();
            }
            else {
                throw err;
            }
        }
    }

    validateUser(user): void {
        if (!user) {
            throw new UnauthorizedException();
        }
    }

    validatePassword(candidatePassword: string, password: string): void {
        const valid: boolean = bcrypt.compareSync(candidatePassword, password);
        if (!valid) {
            throw new UnauthorizedException();
        }
    }
}
