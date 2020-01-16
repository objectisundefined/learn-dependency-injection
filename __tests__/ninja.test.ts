import { ninja } from '../src';

describe('blah', () => {
  it('works', () => {
    expect(ninja.fight()).toEqual('cut!'); // true
    expect(ninja.sneak()).toEqual('hit!'); // true
  });
});
