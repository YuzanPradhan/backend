import { NotFoundException } from '@nestjs/common';

export class ForeignKeyNotFoundException extends NotFoundException {
  constructor(field: string, value: number | string) {
    super(`${field} with value ${value} not found`);
  }
}
