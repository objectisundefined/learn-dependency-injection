import { inject, injectable, Container } from 'inversify';
import { Katana, Shuriken } from '../src/entities';

type KatanaProvider = () => Promise<Katana>;

@injectable()
class Ninja implements Ninja {
  public katana: null | Katana;
  public shuriken: Shuriken;
  public katanaProvider: KatanaProvider;

  public constructor(
    @inject('KatanaProvider') katanaProvider: KatanaProvider,
    @inject('Shuriken') shuriken: Shuriken
  ) {
    this.katanaProvider = katanaProvider;
    this.katana = null;
    this.shuriken = shuriken;
  }

  public fight() {
    return this.katana!.hit();
  }
  public sneak() {
    return this.shuriken.throw();
  }
}

const container = new Container();

container.bind<KatanaProvider>('KatanaProvider').toProvider<Katana>(context => {
  return () => {
    return new Promise<Katana>(resolve => {
      let katana = context.container.get<Katana>('Katana');
      resolve(katana);
    });
  };
});

container.bind<Katana>('Katana').to(Katana);
container.bind<Shuriken>('Shuriken').to(Shuriken);
container.bind<Ninja>('Ninja').to(Ninja);

describe('provider', () => {
  it('works', () => {
    const ninja = container.get<Ninja>('Ninja');

    expect(ninja.katana).toBe(null);

    return ninja
      .katanaProvider()
      .then(katana => {
        ninja.katana = katana;
      })
      .then(() => expect(ninja.fight()).toBe('cut!'));
  });
});
