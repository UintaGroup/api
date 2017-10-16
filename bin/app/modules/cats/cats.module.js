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
const cats_controller_1 = require("./cats.controller");
const cats_service_1 = require("./cats.service");
const cats_providers_1 = require("./cats.providers");
const database_module_1 = require("../database/database.module");
const common_module_1 = require("../common/common.module");
let CatsModule = class CatsModule {
    configure(consumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(cats_controller_1.CatsController);
    }
};
CatsModule = __decorate([
    common_1.Module({
        modules: [database_module_1.DatabaseModule, common_module_1.CommonModule],
        controllers: [cats_controller_1.CatsController],
        components: [
            cats_service_1.CatsService,
            ...cats_providers_1.catsProviders,
        ],
    })
], CatsModule);
exports.CatsModule = CatsModule;
//# sourceMappingURL=cats.module.js.map