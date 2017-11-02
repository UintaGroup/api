import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    externalId: {type: String},
    passwordResetToken: String,
    facebook: String,
    twitter: String,
    google: String,
    microsoft: String,
    roles: Array,
    active: {type: Boolean, default: true},
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'},
    tokens: Array,
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            Object.defineProperty(ret, 'id', Object.getOwnPropertyDescriptor(ret, '_id'));
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.tokens;
        },
    },
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, undefined, (er: mongoose.Error, hash) => {
            if (er) {
                return next(er);
            }
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.gravatar = function(size: number) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
UserSchema.virtual(('orgId')).get(function() {
    return this.organization._id;
});
UserSchema.virtual(('isStaff')).get(function() {
    return this.roles.indexOf('staff') > -1;
});
