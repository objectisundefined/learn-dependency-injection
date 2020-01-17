import { ninja } from '../src';

// test for integration
// import { ninja } from '../dist/index'

describe('ninja', () => {
  it('works', () => {
    expect(ninja.fight()).toEqual('cut!');
    expect(ninja.sneak()).toEqual('hit!');
  });
});
