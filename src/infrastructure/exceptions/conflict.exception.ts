import { ConflictException } from '@nestjs/common';

export const ThrowConflictException = (
  field: string,
  value: string,
): ConflictException =>
  new ConflictException(`Conflict: ${field} ${value} already exists`);
