import { NotFoundException } from '@nestjs/common';

export class ForeignKeyNotFoundException extends NotFoundException {
  constructor(entityName: string, id: number) {
    super(`${entityName} with id ${id} not found`);
  }
}
