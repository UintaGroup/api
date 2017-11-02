import * as mongoose from 'mongoose';

const _toJSON = {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
    },
};

export const ExpenseCategorySchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    description: {type: String, required: false},
    active: {type: Boolean, default: true},
    sourceSystemId: {type: String, required: true},
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'},
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            Object.defineProperty(ret, 'id', Object.getOwnPropertyDescriptor(ret, '_id'));
            delete ret._id;
            delete ret.__v;
        },
    },
});
ExpenseCategorySchema.index({sourceSystemId: 1, organization: 1 }, { unique: true});
