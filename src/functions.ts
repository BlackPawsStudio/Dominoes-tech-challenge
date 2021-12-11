import {
  Die, Player, Available, Table, Pile,
} from './types';

export const getRandom = (max:number, min:number):number => Math.trunc(Math.random() * (max - min) + min);

export const getHighestDie = (dies:Die[]):number => {
  let max = 0;
  dies.forEach((die) => {
    if (die[0] + die[1] > max) max = die[0] + die[1];
  });
  return max;
};

export const fillPile = ():Die[] => {
  const pile:string[] = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = 0; j <= 6; j++) {
      const newDie:Die = i < j ? [i, j] : [j, i];
      pile.push(JSON.stringify(newDie));
    }
  }
  return [...new Set(pile)].map((el) => JSON.parse(el));
};

export const fillPlayers = (playersAmount:number):Player[] => {
  const players:Player[] = [];
  for (let i = 0; i < playersAmount; i++) {
    players.push({
      id: i,
      dies: [],
    });
  }
  return players;
};

export const getRandomDie = (pile:Die[]):Die => {
  const dieN = getRandom(pile.length, 0);
  const ret = pile[dieN];
  pile.splice(dieN, 1);
  return ret;
};

const pickDie = (player:Player, pile:Die[]):void => {
  player.dies.push(getRandomDie(pile));
};

export const pickDies = (players:Player[], pile:Die[]):void => {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < players.length; j++) {
      pickDie(players[j], pile);
    }
  }
};

export const findAvailable = (available:Available, dies:Die[]):Die | undefined => {
  const ret = dies.find((die) => {
    if (die[0] === available[0]
      || die[0] === available[1]
      || die[1] === available[0]
      || die[1] === available[1]) {
      return die;
    }
    return undefined;
  });
  return ret;
};

export const addToTable = (table:Table, die:Die):void => {
  if (die[0] === table.available()[1]) {
    table.allDetails.push(die);
  } else if (die[1] === table.available()[0]) {
    table.allDetails.unshift(die);
  } else {
    const newDie = die.reverse();
    if (newDie[0] === table.available()[1]) {
      table.allDetails.push(newDie);
    } else if (newDie[1] === table.available()[0]) {
      table.allDetails.unshift(newDie);
    }
  }
};

export const playerMove = (player:Player, table:Table, pile:Pile):boolean => {
  let availableDie = findAvailable(table.available(), player.dies);
  if (!availableDie) {
    while (!findAvailable(table.available(), player.dies)) {
      if (pile.length === 0) {
        console.log(`Pile now is empty, player ${player.id}'s skipping`);
        console.log('\n\r\n\r');
        return true;
      }

      player.dies.unshift(getRandomDie(pile));
      console.log(`Player ${player.id} picked ${JSON.stringify(player.dies[0])}`);
      console.log(`Player ${player.id} now has ${JSON.stringify(player.dies)}`);
      console.log('\n\r');
    }
  }
  availableDie = findAvailable(table.available(), player.dies);
  if (availableDie) {
    const availableDieID = player.dies.indexOf(availableDie);
    player.dies.splice(availableDieID, 1);
    addToTable(table, availableDie);
    console.log(`Player ${player.id} played ${JSON.stringify(availableDie)}`);
    console.log(`Player ${player.id} now has ${JSON.stringify(player.dies)}`);
    console.log(`Pile now is ${JSON.stringify(pile)}`);
    console.log(`Table now is ${JSON.stringify(table.allDetails)}`);
    console.log('\n\r\n\r');
  }
  return false;
};
