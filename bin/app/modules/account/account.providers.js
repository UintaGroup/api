"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./schema/user.schema");
const organization_schema_1 = require("./schema/organization.schema");
exports.accountProviders = [
    {
        provide: 'UserModelToken',
        useFactory: (connection) => connection.model('User', user_schema_1.UserSchema),
        inject: ['DbConnectionToken'],
    },
    {
        provide: 'OrganizationModelToken',
        useFactory: (connection) => connection.model('Organization', organization_schema_1.OrganizationSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=account.providers.js.map