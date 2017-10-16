"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const api_entity_util_1 = require("../../common/util/api-entity.util");
exports.CatSchema = new mongoose.Schema({
    name: { type: String, index: true, unique: true },
    age: { type: Number, required: true },
    breed: { type: String, default: 'mixed' },
}, {
    timestamps: true,
    toJSON: api_entity_util_1.ApiEntityUtil.toJSON,
});
//# sourceMappingURL=cat.schema.js.map