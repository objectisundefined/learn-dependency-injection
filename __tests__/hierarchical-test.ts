import { injectable, Container } from 'inversify';
import 'reflect-metadata';

const weaponIdentifier = 'Weapon';

@injectable()
class Katana {}

const parentContainer = new Container();
parentContainer.bind(weaponIdentifier).to(Katana);

const childContainer = new Container();
childContainer.parent = parentContainer;

describe('hierarchical', () => {
  it('works', () => {
    expect(childContainer.get(weaponIdentifier)).toBeInstanceOf(Katana);
  });
});
