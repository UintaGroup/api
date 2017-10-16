import * as jwt from 'jsonwebtoken';
import { IAuthToken } from '../interfaces';
import { IJwt } from '../interfaces';

export class AuthToken implements IAuthToken {

    public token: string;

    constructor(secret: string, user: object, public expiresIn: number) {
        this.token = jwt.sign(user, secret, {expiresIn});
    }

    public static verify(token: string): Promise<IJwt> {
       return new Promise((resolve, reject) => {
           jwt.verify(token, 'secret', (err, decoded) => {
               if(err) {
                   reject(err);
               } else {
                   resolve(decoded);
               }
           })
       });
    }
}