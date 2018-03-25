import * as jwt from 'jsonwebtoken';
import { IAuthToken } from '../interfaces';

export class AuthToken implements IAuthToken {

    public token: string;

    constructor(user: object, public expiresIn: number) {
        this.token = jwt.sign(user, process.env.UINTA_SECRET, {expiresIn});
    }
}