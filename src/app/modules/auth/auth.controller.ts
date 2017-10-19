import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto, SetPasswordDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get()
    public async authorized() {
        return {statusCode: 200, message: 'Authorized'};
    }

    @Post()
    public async login(@Body() credentialsDto: CredentialsDto): Promise<any> {
        return await this.authService.authenticate(credentialsDto.email, credentialsDto.password);
    }

    @Get('password-reset/:email')
    public async resetPassword(@Param('email') email: string): Promise<void> {
        return await this.authService.resetPassword(email);
    }

    @Post('password-reset')
    public async setPassword(@Body() passwordSetDto: SetPasswordDto): Promise<void> {
        return await this.authService.setPassword(passwordSetDto);
    }
}
