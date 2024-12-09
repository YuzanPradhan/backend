import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Manager',
    description: 'The name of the role',
  })
  role_name: string;

  @ApiProperty({
    example: {
      canCreateReviews: true,
      canEditReviews: true,
      canDeleteReviews: false,
    },
    description: 'The permissions associated with this role',
  })
  permissions: object;
}
