import { Organization, User } from '../interfaces';

export class AuthContext {
    constructor(private _user: User) {
    }

    public get user(): User {
        return this._user;
    }

    public get organization(): Organization {
        return this._user.organization;
    }

    public get userId(): string {
        return this._user.id;
    }

    public get orgId(): string {
        return this._user.organization.id;
    }
}