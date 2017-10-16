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
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const organization_service_1 = require("./organization.service");
let AccountService = class AccountService {
    constructor(userService, organizationService) {
        this.userService = userService;
        this.organizationService = organizationService;
    }
    create(createAccountDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            yield this.organizationService.create(createAccountDto.organization)
                .then(org => {
                result.organization = org;
                return this.userService.createAdmin(createAccountDto.user, org.id);
            })
                .then(user => result.user = user);
            return result;
        });
    }
};
AccountService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [user_service_1.UserService, organization_service_1.OrganizationService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map