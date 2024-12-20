import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized - Invalid role' }),
  );
