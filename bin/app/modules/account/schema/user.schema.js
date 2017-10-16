"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const mongoose = require("mongoose");
const _toJSON = {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    },
};
exports.UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    passwordResetToken: String,
    facebook: String,
    twitter: String,
    google: String,
    microsoft: String,
    roles: Array,
    active: { type: Boolean, default: true },
    organization: { type: String, ref: 'Organization' },
    tokens: Array,
}, {
    timestamps: true,
    toJSON: _toJSON,
});
exports.UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, undefined, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    });
});
exports.UserSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
//# sourceMappingURL=user.schema.js.map