import { AuthService, BcryptService, JwtService } from './services';
import { JwtStrategy } from './strategies';

export const authProviders = [
    AuthService,
    JwtService,
    JwtStrategy,
    BcryptService,
];