import { Dice } from './types';

export const getRandom = (max:number, min:number):number => Math.trunc(Math.random() * (max - min) + min);

export const getHighestDice = (dices:Dice[]):number => {
  const newDices = dices.map((el) => el[0] + el[1]);
  return Math.max(...newDices);
};

export const getRandomDice = (pile:Dice[]):Dice => {
  const dieN = getRandom(pile.length, 0);
  const ret = pile[dieN];
  pile.splice(dieN, 1);
  return ret;
};
