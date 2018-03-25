import { Component, UnauthorizedException } from '@nestjs/common';
import { InvalidArgumentException } from '../../common/exceptions';
import { AuthToken } from '../models';
import { IAuthToken } from '../interfaces';
import { SetPasswordDto } from '../dto';
import { User } from '../../user';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { UserService } from '../../user/services';

@Component()
export class AuthService {
    constructor(private readonly userService: UserService, private bcryptService: BcryptService, private jwtService: JwtService) {
    }

    async authenticate(email, password): Promise<IAuthToken> {
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
            const token = await this.jwtService.verifyToken(setPasswordDto.token);
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

    validateUser(user?: User): void {
        if (!user) {
            throw new UnauthorizedException();
        }
    }

    validatePassword(candidatePassword: string, password: string): void {
        const valid: boolean = this.bcryptService.compareSync(candidatePassword, password);
        if (!valid) {
            throw new UnauthorizedException();
        }
    }
}
