import { Guard } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces/can-activate.interface';
import { ExecutionContext } from '@nestjs/common/interfaces/execution-context.interface';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(req, context: ExecutionContext): boolean {
        const { parent, handler } = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }

        const user = req.user;
        const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));
        return user.isStaff || user && user.roles && hasRole();
    }
}