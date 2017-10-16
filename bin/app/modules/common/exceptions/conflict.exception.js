"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
class ConflictException extends core_1.HttpException {
    constructor() {
        super('Conflict', common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictException = ConflictException;
//# sourceMappingURL=conflict.exception.js.map