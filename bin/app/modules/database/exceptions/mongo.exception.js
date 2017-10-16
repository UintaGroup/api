"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
class MongoException extends core_1.HttpException {
    constructor(_rawMongoException) {
        super(MongoException.parseType(_rawMongoException), MongoException.parseStatus(_rawMongoException));
        this._rawMongoException = _rawMongoException;
    }
    static parseType(mErr) {
        switch (mErr.code) {
            case 11000:
                return 'Conflict';
            default:
                return 'Unhandled Exception';
        }
    }
    static parseStatus(mErr) {
        switch (mErr.code) {
            case 11000:
                return common_1.HttpStatus.CONFLICT;
            default:
                return 500;
        }
    }
}
exports.MongoException = MongoException;
//# sourceMappingURL=mongo.exception.js.map