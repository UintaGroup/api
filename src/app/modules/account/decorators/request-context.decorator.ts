import { createRouteParamDecorator } from '@nestjs/common';
import { AuthContext } from '../models';

export const ReqContext = createRouteParamDecorator((data, req): AuthContext => {
    return new AuthContext(req.user);
});