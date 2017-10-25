import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto, SetPasswordDto } from './dto';

/**
 * @apiDefine AuthHeader
 * @apiHeader {String} authorization JWT Bearer Token
 * @apiHeaderExample {String} Bearer Token Example:
 *  {
 *    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI3IkpXVCJ9.eyJlbWFpbCI6InNjbGFya2xhc2xleUBnbWFpbC5jb20iLCJpYXQiOjE1MDg1NjAxNTgsImV4cCI6MTUwODU2Mzc1OH0.ytIw5l-lKlFsjq4pyGNAOEM8nsXvvwT4YcL5f4w6rVw"
 *  }
 */
/**
 * @apiDefine Unauthorized
 * @apiError Unauthorized
 * @apiErrorExample
 * HTTP/1.1 401 Unauthorized
 * {
 *   "statusCode": 401,
 *   "message": "Unauthorized"
 * }
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    /**
     * @api {get} /auth/authorized Status
     * @apiName Status
     * @apiGroup Authentication
     * @apiDescription Utility endpoint to check if token valid
     *
     * @apiUse AuthHeader
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     * @apiUse Unauthorized
     */
    @Get()
    public async authorized() {
        return {statusCode: 200, message: 'Authorized'};
    }

    /**
     * @api {post} /auth Login
     * @apiName Login
     * @apiGroup Authentication
     * @apiParam {String} email Users email address.
     * @apiParam {String} password Users password.
     * @apiDescription Authenticate to API
     *
     * @apiParamExample {json} Request-Example:
     * {
     *    "email": "flurrytime@gmail.com",
     *    "password": "MyPassword"
     * }
     *
     * @apiSuccess {Number} expiresIn Duration (in seconds) for which token will be valid .
     * @apiSuccess {String} token Token value.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "expiresIn": 3600,
     *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNjbGFya2xhc2xleUBnbWFpbC5jb20iLCJpYXQiOjE1MDg3MDc2MTksImV4cCI6MTUwODcxMTIxOX0.1ZFEDcfCLpKn-9j4qPtZBt-PI8op9EMP0SdEpGEVieg"
     *  }
     *
     * @apiError Unauthorized Invalid email or password.
     *
     * @apiErrorExample Failed-Response
     * HTTP/1.1 401
     * {
     *   "statusCode": 401,
     *   "message": "Unauthorized"
     * }
     */
    @Post()
    public async login(@Body() credentialsDto: CredentialsDto): Promise<any> {
        return await this.authService.authenticate(credentialsDto.email, credentialsDto.password);
    }

    /**
     * @api {get} /auth/password-reset/:email Reset Password
     * @apiName Reset Password
     * @apiGroup Authentication
     * @apiDescription Request a reset token via Email
     *
     * @apiParam {string} email Email address of user requesting password reset
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *
     */
    @Get('password-reset/:email')
    public async resetPassword(@Param('email') email: string): Promise<void> {
        return await this.authService.resetPassword(email);
    }

    /**
     * @api {post} /auth/password-reset Set Password
     * @apiName Password Set
     * @apiGroup Authentication
     * @apiDescription Set Password using token from email
     *
     * @apiParam {String} token Token from email.
     * @apiParam {String{8-20}} password Desired Password.
     * @apiParamExample
     * {
     *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI3IkpXVCJ9.eyJlbWFpbCI6InNjbGFya2xhc2xleUBnbWFpbC5jb20iLCJpYXQiOjE1MDgyODIzMDgsImV4cCI6MTUwODM2ODcwOH0.aONDhBELZHiGTaqzlokcs87LVrN63NulNDA8AubADOU",
     *   "password": "Pa$$word",
     * }
     */
    @Post('password-reset')
    public async setPassword(@Body() passwordSetDto: SetPasswordDto): Promise<void> {
        return await this.authService.setPassword(passwordSetDto);
    }
}
