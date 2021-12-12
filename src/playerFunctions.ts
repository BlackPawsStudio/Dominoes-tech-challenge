import { Dice, Player, Available } from './types';
import { getRandomDice } from './diceFunctions';

export const fillPlayers = (playersAmount:number):Player[] => {
  const players:Player[] = [];
  for (let i = 0; i < playersAmount; i++) {
    players.push({
      id: i,
      dice: [],
    });
  }
  return players;
};

const pickDice = (player:Player, pile:Dice[]):void => {
  player.dice.push(getRandomDice(pile));
};

export const pickDices = (players:Player[], pile:Dice[]):void => {
  for (let i = 0; i < 7; i++) {
    players.forEach((el) => pickDice(el, pile));
  }
};

export const findAvailable = (available:Available, dice:Dice[]):Dice | undefined => {
  const ret = dice.find((el) => {
    if (el[0] === available[0]
      || el[0] === available[1]
      || el[1] === available[0]
      || el[1] === available[1]) {
      return el;
    }
    return undefined;
  });
  return ret;
};
