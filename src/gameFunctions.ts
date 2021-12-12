import {
  Dice, Player, Table, Pile,
} from './types';
import { getRandomDice } from './diceFunctions';
import { findAvailable } from './playerFunctions';

export const fillPile = ():Dice[] => {
  const pile:Dice[] = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = 0; j <= i; j++) {
      const newDice:Dice = [i, j];
      pile.push(newDice);
    }
  }
  return pile;
};

export const addToTable = (table:Table, dice:Dice):void => {
  const availableNums = table.availableNumbers();
  const reversedDice:Dice = [dice[1], dice[0]];
  const allVariants:Dice[] = [dice, reversedDice];
  for (let i = 0; i < allVariants.length; i++) {
    if (allVariants[i][0] === availableNums[1]) {
      table.allDetails.push(allVariants[i]);
      break;
    } else if (allVariants[i][1] === availableNums[0]) {
      table.allDetails.unshift(allVariants[i]);
      break;
    }
  }
};

export const playerMove = (player:Player, table:Table, pile:Pile):boolean => {
  let availableDice = findAvailable(table.availableNumbers(), player.dice);
  if (!availableDice) {
    while (!availableDice) {
      if (pile.length === 0) {
        console.log(`Pile now is empty, player ${player.id}'s skipping`);
        console.log('\n\r\n\r');
        return true;
      }
      player.dice.unshift(getRandomDice(pile));
      console.log(`Player ${player.id} picked ${JSON.stringify(player.dice[0])}`);
      console.log(`Player ${player.id} now has ${JSON.stringify(player.dice)}`);
      console.log('\n\r');
      availableDice = findAvailable(table.availableNumbers(), player.dice);
    }
  }
  const availableDiceID = player.dice.indexOf(availableDice);
  player.dice.splice(availableDiceID, 1);
  addToTable(table, availableDice);
  console.log(`Player ${player.id} played ${JSON.stringify(availableDice)}`);
  console.log(`Player ${player.id} now has ${JSON.stringify(player.dice)}`);
  console.log(`Pile now is ${JSON.stringify(pile)}`);
  console.log(`Table now is ${JSON.stringify(table.allDetails)}`);
  console.log('\n\r\n\r');
  return false;
};
