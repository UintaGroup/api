export class ApiEntityUtil {
    public static toJSON = {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.tokens;
        },
    };
}