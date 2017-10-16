"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cat_schema_1 = require("./schemas/cat.schema");
exports.catsProviders = [
    {
        provide: 'CatModelToken',
        useFactory: (connection) => connection.model('Cat', cat_schema_1.CatSchema),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=cats.providers.js.map