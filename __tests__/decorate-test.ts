import { decorate, inject, injectable, Container } from 'inversify';
require('reflect-metadata');

const TYPES = {
  Ninja: 'Ninja',
  Katana: 'Katana',
  Shuriken: 'Shuriken',
};

class Katana {
  hit() {
    return 'cut!';
  }
}

class Shuriken {
  throw() {
    return 'hit!';
  }
}

class Ninja {
  constructor(private _katana: Katana, private _shuriken: Shuriken) {}
  fight() {
    return this._katana.hit();
  }
  sneak() {
    return this._shuriken.throw();
  }
}

// Declare as injectable and its dependencies
decorate(injectable(), Katana);
decorate(injectable(), Shuriken);
decorate(injectable(), Ninja);
decorate(inject(TYPES.Katana) as ClassDecorator, Ninja, 0);
decorate(inject(TYPES.Shuriken) as ClassDecorator, Ninja, 1);

// Declare bindings
const container = new Container();
container.bind(TYPES.Ninja).to(Ninja);
container.bind(TYPES.Katana).to(Katana);
container.bind(TYPES.Shuriken).to(Shuriken);

describe('decorate', () => {
  it('works', () => {
    // Resolve dependencies
    const ninja = container.get<Ninja>(TYPES.Ninja);

    expect(ninja.fight()).toEqual('cut!');
    expect(ninja.sneak()).toEqual('hit!');
  });
});
