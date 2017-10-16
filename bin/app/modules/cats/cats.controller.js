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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const create_cat_dto_1 = require("./dto/create-cat.dto");
const update_cat_dto_1 = require("./dto/update-cat.dto");
const cats_service_1 = require("./cats.service");
const pipes_1 = require("../common/pipes");
const guards_1 = require("../auth/guards");
const decorators_1 = require("../auth/decorators");
let CatsController = class CatsController {
    constructor(catsService) {
        this.catsService = catsService;
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.catsService.find(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.catsService.findAll();
        });
    }
    create(createCatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.catsService.create(createCatDto);
        });
    }
    update(updateCatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.catsService.update(updateCatDto);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.catsService.delete(id);
        });
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id', new pipes_1.ObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "find", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    decorators_1.Roles('admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cat_dto_1.CreateCatDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "create", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cat_dto_1.UpdateCatDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', new pipes_1.ObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "delete", null);
CatsController = __decorate([
    common_1.Controller('cats'),
    common_1.UseGuards(guards_1.RolesGuard),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsController);
exports.CatsController = CatsController;
//# sourceMappingURL=cats.controller.js.map