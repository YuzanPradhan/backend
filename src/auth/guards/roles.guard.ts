import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Injectable()
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized - Invalid role' })
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('Required roles:', requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('User from request:', user);
    const hasRole = requiredRoles.some(role => 
      role.toLowerCase() === (user.role || '').toLowerCase()
    );
    console.log('Has required role:', hasRole);
    return hasRole;
  }
}
