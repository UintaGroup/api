"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiEntityUtil {
}
ApiEntityUtil.toJSON = {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.tokens;
    },
};
exports.ApiEntityUtil = ApiEntityUtil;
//# sourceMappingURL=api-entity.util.js.map