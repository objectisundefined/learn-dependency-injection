import { inject, injectable, interfaces, Container } from 'inversify';
import { Weapon, ThrowableWeapon } from '../src/interfaces';
import { Katana, Shuriken } from '../src/entities';

@injectable()
class Ninja {
  private _katana: Katana;
  private _shuriken: Shuriken;

  constructor(
    @inject('Factory<Weapon>')
    weaponFactory: (throwable: boolean) => Weapon | ThrowableWeapon
  ) {
    this._katana = weaponFactory(false) as Weapon;
    this._shuriken = weaponFactory(true) as ThrowableWeapon;
  }

  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
}

const container = new Container();

container
  .bind<interfaces.Factory<Weapon | ThrowableWeapon>>('Factory<Weapon>')
  .toFactory((context: interfaces.Context) => {
    return (throwable: boolean) => {
      if (throwable) {
        return context.container.getTagged<Weapon>('Weapon', 'throwable', true);
      } else {
        return context.container.getTagged<ThrowableWeapon>(
          'Weapon',
          'throwable',
          false
        );
      }
    };
  });

container
  .bind<Weapon>('Weapon')
  .to(Katana)
  .whenTargetTagged('throwable', false);
container
  .bind<ThrowableWeapon>('Weapon')
  .to(Shuriken)
  .whenTargetTagged('throwable', true);
container.bind<Ninja>('Ninja').to(Ninja);

describe('factory', () => {
  it('works', () => {
    const ninja = container.get<Ninja>('Ninja');
    expect(ninja.fight()).toBe('cut!');
    expect(ninja.sneak()).toBe('hit!');
  });
});
