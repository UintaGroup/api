import * as mongoose from 'mongoose';
import { ReportStatus } from '../enum';
import { ExpenseSchema } from './expense.schema';

const _toJSON = {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
};

export const ExpenseReportSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    description: {type: String, required: false},
    startDate: {type: Date},
    endDate: {type: Date},
    status: {type: Number, default: ReportStatus.Open},
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    expenses: [ExpenseSchema],
}, {
    timestamps: true,
    toJSON: _toJSON,
});

ExpenseReportSchema.virtual('total').
get(function() {
    return this.expenses.reduce((a, b) => a.amount + b.amount);
});
