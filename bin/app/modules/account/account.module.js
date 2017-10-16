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
const common_2 = require("../common");
const database_1 = require("../database");
const services_1 = require("./services");
const controllers_1 = require("./controllers");
const account_providers_1 = require("./account.providers");
let AccountModule = class AccountModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(controllers_1.OrganizationController, controllers_1.UserController);
    }
};
AccountModule = __decorate([
    common_1.Module({
        modules: [database_1.DatabaseModule, common_2.CommonModule],
        components: [services_1.UserService, services_1.AccountService, services_1.OrganizationService, ...account_providers_1.accountProviders],
        controllers: [controllers_1.AccountController, controllers_1.UserController, controllers_1.OrganizationController],
        exports: [services_1.UserService],
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map