import { myContainer } from './inversify.config';
import { TYPES } from './types';
import { Warrior } from './interfaces';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }

  return a + b;
};

export const ninja = myContainer.get<Warrior>(TYPES.Warrior);
