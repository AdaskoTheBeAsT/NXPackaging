import { v4 } from 'uuid';

export function getCorrelationId(): string {
  return v4();
}
