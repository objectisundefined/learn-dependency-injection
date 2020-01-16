import { injectable, multiInject, Container } from 'inversify';
import { Katana, Shuriken } from '../src/entities';
import { Weapon, ThrowableWeapon } from '../src/interfaces';

@injectable()
class Ninja implements Ninja {
  public katana: Weapon;
  public shuriken: ThrowableWeapon;

  public constructor(
    @multiInject('Weapon') weapons: (Weapon | ThrowableWeapon)[]
  ) {
    this.katana = weapons[0] as Weapon;
    this.shuriken = weapons[1] as ThrowableWeapon;
  }

  fight() {
    return this.katana.hit();
  }

  sneak() {
    return this.shuriken.throw();
  }
}

const container = new Container();

container.bind<Ninja>('Ninja').to(Ninja);
container.bind<Weapon>('Weapon').to(Katana);
container.bind<ThrowableWeapon>('Weapon').to(Shuriken);

describe('multi injection', () => {
  it('works', () => {
    const ninja = container.get<Ninja>('Ninja');

    expect(ninja.fight()).toEqual('cut!');
    expect(ninja.sneak()).toEqual('hit!');
  });
});
