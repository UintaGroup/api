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
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongo_exception_1 = require("../database/exceptions/mongo.exception");
let CatsService = class CatsService {
    constructor(catModel) {
        this.catModel = catModel;
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catModel.findById(id).exec();
            }
            catch (err) {
                throw new mongo_exception_1.MongoException(err);
            }
        });
    }
    create(createCatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cat = new this.catModel(createCatDto);
                return yield cat.save()
                    .then(c => c);
            }
            catch (err) {
                throw new mongo_exception_1.MongoException(err);
            }
        });
    }
    update(updateCatDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete updateCatDto['name'];
                yield this.catModel.findByIdAndUpdate(updateCatDto.id, updateCatDto);
            }
            catch (err) {
                throw new mongo_exception_1.MongoException(err);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catModel.find().exec();
            }
            catch (err) {
                throw new mongo_exception_1.MongoException(err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.catModel.findByIdAndRemove(id).exec();
            }
            catch (err) {
                throw new mongo_exception_1.MongoException(err);
            }
        });
    }
};
CatsService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('CatModelToken')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CatsService);
exports.CatsService = CatsService;
//# sourceMappingURL=cats.service.js.map