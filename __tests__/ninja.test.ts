import { ninja } from '../src';

describe('ninja', () => {
  it('works', () => {
    expect(ninja.fight()).toEqual('cut!');
    expect(ninja.sneak()).toEqual('hit!');
  });
});
