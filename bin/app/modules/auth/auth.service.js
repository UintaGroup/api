"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
const common_1 = require("@nestjs/common");
const account_1 = require("../account");
const models_1 = require("./models");
const exceptions_1 = require("../common/exceptions");
const invalid_argument_exception_1 = require("../common/exceptions/invalid-argument.exception");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.find(email)
                .then(user => {
                this.validateUser(user);
                this.validatePassword(password, user.password);
                return new models_1.AuthToken('secret', { email: user.email }, 3600);
            });
        });
    }
    validateFacebookUser(req, accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(true);
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let resetToken = new models_1.AuthToken('secret', { email: email }, 86400);
            console.log('PASSWORD RESET', resetToken.token);
            yield this.userService.find(email)
                .then(user => {
                this.validateUser(user);
                user.passwordResetToken = resetToken.token;
                user.save();
            });
        });
    }
    setPassword(setPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.AuthToken.verify(setPasswordDto.token)
                    .then((token) => this.userService.findOne({
                    email: token.email,
                    passwordResetToken: setPasswordDto.token
                }))
                    .then(user => {
                    this.validateUser(user);
                    user.passwordResetToken = '';
                    user.password = setPasswordDto.password;
                    user.save();
                });
            }
            catch (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new invalid_argument_exception_1.InvalidArgumentException();
                }
                else {
                    throw err;
                }
            }
        });
    }
    validateUser(user) {
        if (!user) {
            throw new exceptions_1.UnauthorizedException();
        }
    }
    validatePassword(candidatePassword, password) {
        const valid = bcrypt.compareSync(candidatePassword, password);
        if (!valid) {
            throw new exceptions_1.UnauthorizedException();
        }
    }
};
AuthService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [account_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map