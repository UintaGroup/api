"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../account/schema/user.schema");
exports.authProviders = [
    {
        provide: 'UserModelToken',
        useFactory: (connection) => connection.model('User', user_schema_1.UserSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=auth.providers.js.map