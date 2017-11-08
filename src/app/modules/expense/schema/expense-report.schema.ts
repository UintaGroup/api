import * as mongoose from 'mongoose';
import { ReportStatus } from '../enum/status.enum';
import { ExpenseSchema } from './expense.schema';

export const ExpenseReportSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    description: {type: String, required: false},
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now},
    status: {type: String, default: ReportStatus.Submitted},
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    expenses: [ExpenseSchema],
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
// Getter
// ExpenseSchema.path('price').get(num =>  (num / 100).toFixed(2));

// Setter
// ExpenseSchema.path('price').set(num => num * 100);
