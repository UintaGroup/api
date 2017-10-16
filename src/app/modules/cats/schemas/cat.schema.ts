import * as mongoose from 'mongoose';
import { ApiEntityUtil } from '../../common/util/api-entity.util';

export const CatSchema = new mongoose.Schema({
        name: {type: String, index: true, unique: true},
        age: {type: Number, required: true},
        breed: {type: String, default: 'mixed'},
    },
    {
        timestamps: true,
        toJSON: ApiEntityUtil.toJSON,
    });
