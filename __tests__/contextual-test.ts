import {
  inject,
  injectable,
  interfaces,
  named,
  targetName,
  Container,
  namedConstraint,
} from 'inversify';
import 'reflect-metadata'; // required

interface Weapon {}

@injectable()
class Katana implements Weapon {}

@injectable()
class Shuriken implements Weapon {}

interface Ninja {
  katana: Weapon;
  shuriken: Weapon;
}

@injectable()
class Ninja implements Ninja {
  public katana: Weapon;
  public shuriken: Weapon;
  public constructor(
    @inject('Weapon') @named('katana') katana: Weapon,
    @inject('Weapon') @targetName('shuriken') shuriken: Weapon
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
  // some helpers: traverseAncerstors, taggedConstraint, namedConstraint, typeConstraint
  // when decorated with @named
  .when(namedConstraint('katana'));
// or with whenTargetNamed
// .whenTargetNamed('katana');

container
  .bind<Weapon>('Weapon')
  .to(Shuriken)
  .when((request: interfaces.Request) => {
    /*
    Target {
      id: 9,
      type: 'ConstructorArgument',
      serviceIdentifier: 'Weapon',
      name: QueryableString { str: 'shuriken' },
      metadata: [
        Metadata { key: 'name', value: 'shuriken' },
        Metadata { key: 'inject', value: 'Weapon' }
      ]
    }
    */
    return request.target.name.equals('shuriken');
  });

describe('contextual binding', () => {
  it('works', () => {
    const ninja = container.get<Ninja>('Ninja');

    expect(ninja.katana instanceof Katana).toBeTruthy();
    expect(ninja.shuriken instanceof Shuriken).toBeTruthy();
  });
});
