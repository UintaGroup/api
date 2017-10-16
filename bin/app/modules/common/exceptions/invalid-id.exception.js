"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
class InvalidIdException extends core_1.HttpException {
    constructor() {
        super('Invalid Id', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InvalidIdException = InvalidIdException;
//# sourceMappingURL=invalid-id.exception.js.map