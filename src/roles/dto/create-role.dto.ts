import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Manager',
    description: 'The name of the role',
  })
  role_name: string;
}
