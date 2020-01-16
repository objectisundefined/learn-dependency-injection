import { ninja, enemy } from '../src';

describe('enemy', () => {
  it('works', () => {
    // container.bind<Warrior>(TYPES.Warrior).to(Ninja).inSingletonScope() -> true
    expect(ninja).not.toBe(enemy);
  });
});
