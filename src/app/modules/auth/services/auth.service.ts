import * as bcrypt from 'bcrypt-nodejs';
import { Component } from '@nestjs/common';
import { UnauthorizedException, InvalidArgumentException } from '../../common/exceptions';
import { UserService } from '../../account';
import { AuthToken } from '../models';
import { IAuthToken } from '../interfaces';
import { SetPasswordDto } from '../dto';

@Component()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    async authenticate(email, password): Promise<any> {
        return await this.userService.findByEmail(email)
            .then(user => {
                this.validateUser(user);
                this.validatePassword(password, user.password);
                return new AuthToken({email}, 3600);
            });
    }

    async resetPassword(email: string): Promise<any> {
        // TODO - Send email to user account with token
        const resetToken: IAuthToken = new AuthToken({email}, 86400);
        /* tslint:disable */
        console.log('PASSWORD RESET', resetToken.token);
        /* tslint:enable */
        await this.userService.findByEmail(email)
            .then(user => {
                this.validateUser(user);
                user.passwordResetToken = resetToken.token;
                return user.save();
            });
    }

    async setPassword(setPasswordDto: SetPasswordDto): Promise<void> {
        try {
            const token = await AuthToken.verify(setPasswordDto.token);
            const user = await this.userService.findOne({
                email: token.email,
                passwordResetToken: setPasswordDto.token,
            });
            this.validateUser(user);
            user.passwordResetToken = '';
            user.password = setPasswordDto.password;
            await user.save();
        }
        catch (err) {
            if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
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
