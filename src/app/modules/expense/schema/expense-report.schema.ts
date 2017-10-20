import * as mongoose from 'mongoose';
import { ReportStatus } from '../enum/status.enum';

const _toJSON = {
    transform: (doc, ret) => {
        ret['id'] = ret._id;
        delete ret._id;
        delete ret.__v;
    },
};
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
            delete ret._id;
            delete ret.__v;
        }
    },
});
export const ExpenseReportSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    description: {type: String, required: false},
    startDate: {type: Boolean, default: true},
    endDate: {type: Boolean, default: true},
    status: {type: Number, default: ReportStatus.Submitted},
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    expenses: [ExpenseSchema],
}, {
    timestamps: true,
    toJSON: _toJSON,
});
// Getter
// ExpenseSchema.path('price').get(num =>  (num / 100).toFixed(2));

// Setter
// ExpenseSchema.path('price').set(num => num * 100);
