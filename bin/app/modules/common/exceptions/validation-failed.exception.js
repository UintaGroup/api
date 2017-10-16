"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
class ValidationFailedException extends core_1.HttpException {
    constructor() {
        super('Validation failed', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationFailedException = ValidationFailedException;
//# sourceMappingURL=validation-failed.exception.js.map