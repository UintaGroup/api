import { AuthToken } from '../models/auth-token.model';

export class JwtServiceMock {
    constructor(private _authToken: AuthToken){}

    fromAuthHeaderAsBearerToken() {
        return () => this._authToken.token;
    }

    verify(payload, next): void {
        next(null, payload);
    }
}