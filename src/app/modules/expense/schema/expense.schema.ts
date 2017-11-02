import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    description: {type: String},
    expenseDate: {type: Date},
    expenseCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseCategory'},
    merchant: {type: String, required: true},
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