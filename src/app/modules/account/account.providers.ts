import { Connection } from 'mongoose';
import { UserSchema } from './schema/user.schema';
import { OrganizationSchema } from './schema/organization.schema';
import { AccountService, OrganizationService, UserService } from './services';

export const accountProviders = [
    UserService,
    AccountService,
    OrganizationService,
    // {
    //     provide: 'UserModelToken',
    //     useFactory: (connection: Connection) => connection.model('User', UserSchema),
    //     inject: ['DbConnectionToken'],
    // },
    // {
    //     provide: 'OrganizationModelToken',
    //     useFactory: (connection: Connection) => connection.model('Organization', OrganizationSchema),
    //     inject: ['DbConnectionToken'],
    // },
];