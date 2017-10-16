"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
class InvalidArgumentException extends core_1.HttpException {
    constructor() {
        super('Invalid Argument', 422);
    }
}
exports.InvalidArgumentException = InvalidArgumentException;
//# sourceMappingURL=invalid-argument.exception.js.map