"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const _toJSON = {
    transform: (doc, ret) => {
        ret['id'] = ret._id;
        delete ret._id;
        delete ret.__v;
    },
};
exports.OrganizationSchema = new mongoose.Schema({
    name: { type: String, unique: true, trim: true, required: true },
    address: { type: String, required: true },
    addressTwo: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    active: { type: Boolean, default: true },
    companySite: { type: String, required: true },
    publicKey: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
    toJSON: _toJSON,
});
exports.OrganizationSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.name, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.publicKey = hash;
            next();
        });
    });
});
//# sourceMappingURL=organization.schema.js.map