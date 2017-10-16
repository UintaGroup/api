"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class AuthToken {
    constructor(secret, user, expiresIn) {
        this.expiresIn = expiresIn;
        this.token = jwt.sign(user, secret, { expiresIn });
    }
    static verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.AuthToken = AuthToken;
//# sourceMappingURL=auth-token.model.js.map