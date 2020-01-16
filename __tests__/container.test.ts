import { Container, ContainerModule, interfaces } from 'inversify';
import { Ninja, Katana, Shuriken } from '../src/entities';
import { TYPES } from '../src/types';

const warriors = new ContainerModule((bind: interfaces.Bind) => {
  bind<Ninja>('Ninja').to(Ninja);
});

const weapons = new ContainerModule((bind: interfaces.Bind) => {
  bind<Katana>(TYPES.Weapon).to(Katana);
  bind<Shuriken>(TYPES.ThrowableWeapon).to(Shuriken);
});

// application container is shared by all unit tests
const container = new Container();
container.load(warriors, weapons);

describe('container', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });

  afterEach(() => {
    // Restore to last snapshot so each unit test
    // takes a clean copy of the application container
    container.restore();
  });

  // each test is executed with a snapshot of the container

  it('Ninja can fight', () => {
    let katanaMock = {
      hit: () => {
        return 'hit with mock';
      },
    };

    container.unbind(TYPES.Weapon);
    container.bind<Katana>(TYPES.Weapon).toConstantValue(katanaMock);
    let ninja = container.get<Ninja>('Ninja');
    expect(ninja.fight()).toBe('hit with mock');
  });

  it('Ninja can sneak', () => {
    const shurikenMock = {
      throw: () => {
        return 'hit with mock';
      },
    };

    container.unbind(TYPES.ThrowableWeapon);
    container
      .bind<Shuriken>(TYPES.ThrowableWeapon)
      .toConstantValue(shurikenMock);
    const ninja = container.get<Ninja>('Ninja');
    expect(ninja.sneak()).toBe('hit with mock');
  });
});
