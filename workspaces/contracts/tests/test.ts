import { assert } from 'chai';

describe('Test', () => {
  it('should pass', () => {
    assert(true);
  });
  it("shouldn't pass", () => {
    assert(false, 'this should happen.');
  });
});
