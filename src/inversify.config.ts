import { Container } from 'inversify';
import { TYPES } from './types';
import { Warrior, Weapon, ThrowableWeapon } from './interfaces';
import { Ninja, Katana, Shuriken } from './entities';

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { myContainer };

/*
Support for classes
Support for Symbols
Container API
Declaring container modules
Container snapshots
Controlling the scope of the dependencies
Declaring optional dependencies
Injecting a constant or dynamic value
Injecting a class constructor
Injecting a Factory
Auto factory
Injecting a Provider (asynchronous Factory)
Activation handler
Post Construct decorator
Middleware
Multi-injection
Tagged bindings
Create your own tag decorators
Named bindings
Default target
Support for hierarchical DI systems
Contextual bindings & @targetName
Property injection
Circular dependencies
Inheritance
*/
