import { inject, injectable, tagged, Container } from 'inversify';
import 'reflect-metadata'; // required

interface Weapon {
  canThrow: boolean;
}

@injectable()
class Katana implements Weapon {
  canThrow = false;
}

@injectable()
class Shuriken implements Weapon {
  canThrow = true;
}

interface Ninja {
  katana: Weapon;
  shuriken: Weapon;
}

@injectable()
class Ninja implements Ninja {
  public katana: Weapon;
  public shuriken: Weapon;
  public constructor(
    @inject('Weapon') @tagged('canThrow', false) katana: Weapon,
    @inject('Weapon') @tagged('canThrow', true) shuriken: Weapon
  ) {
    this.katana = katana;
    this.shuriken = shuriken;
  }
}

const container = new Container();

container.bind<Ninja>('Ninja').to(Ninja);
container
  .bind<Weapon>('Weapon')
  .to(Katana)
  .whenTargetTagged('canThrow', false);
container
  .bind<Weapon>('Weapon')
  .to(Shuriken)
  .whenTargetTagged('canThrow', true);

describe('tagged injection', () => {
  it('works', () => {
    const ninja = container.get<Ninja>('Ninja');

    expect(
      ninja.katana instanceof Katana && !ninja.katana.canThrow
    ).toBeTruthy();
    expect(
      ninja.shuriken instanceof Shuriken && ninja.shuriken.canThrow
    ).toBeTruthy();
  });
});
