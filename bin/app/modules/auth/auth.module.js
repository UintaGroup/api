"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const common_2 = require("../common");
const database_1 = require("../database");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const account_1 = require("../account");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/auth', method: common_1.RequestMethod.GET });
    }
};
AuthModule = __decorate([
    common_1.Module({
        modules: [database_1.DatabaseModule, common_2.CommonModule, account_1.AccountModule],
        components: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
        ],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map