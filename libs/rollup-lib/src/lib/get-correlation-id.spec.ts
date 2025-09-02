import { getCorrelationId } from './get-correlation-id';

describe('getCorrelationId', () => {
  it('should work', () => {
    expect(getCorrelationId()).toMatch(
      /^[{(]?[0-9A-Fa-f]{8}-?(?:[0-9A-Fa-f]{4}-?){3}[0-9A-Fa-f]{12}[)}]?/,
    );
  });
});
