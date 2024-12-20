import { ConflictException } from '@nestjs/common';

export class DuplicateEntryException extends ConflictException {
  constructor(field: string) {
    super(`${field} already exists`);
  }
}
