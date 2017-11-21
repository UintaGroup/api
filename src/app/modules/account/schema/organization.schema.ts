import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';

const _toJSON = {
    transform: (doc, ret) => {
        delete ret.__v;
    },
};
export const OrganizationSchema = new mongoose.Schema({
    name: {type: String, unique: true, trim: true, required: true},
    address: {type: String, required: true},
    addressTwo: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    active: {type: Boolean, default: true},
    companySite: {type: String, required: true},
    publicKey: {type: String},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true,
    toJSON: _toJSON,
});

OrganizationSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.name, salt, undefined, (er: mongoose.Error, hash) => {
            if (er) {
                return next(err);
            }
            this.publicKey = hash;
            next();
        });
    });
});
