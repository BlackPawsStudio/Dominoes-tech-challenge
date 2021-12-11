import { Pile, Player, Table } from './types';
import {
  playerMove,
  fillPile, fillPlayers, getRandomDie, pickDies, getHighestDie,
} from './functions';

const pile:Pile = fillPile();

const playersAmount = 2;

const players:Player[] = fillPlayers(playersAmount);

pickDies(players, pile);

const table:Table = {
  allDetails: [getRandomDie(pile)],
  available() {
    return [this.allDetails[0][0], this.allDetails[this.allDetails.length - 1][1]];
  },
};

players.forEach((el, id) => {
  console.log(`Player ${id} has ${JSON.stringify(el.dies)}`);
});
players.sort((a, b) => {
  if (getHighestDie(a.dies) < getHighestDie(b.dies)) return 1;
  return -1;
});
console.log(`Default pile is ${JSON.stringify(pile)}`);
console.log(`Default table is ${JSON.stringify(table.allDetails)}`);
console.log(`Player ${players[0].id} moves first`);
console.log('\n\r\n\r\n\r');

let gameEnd = false;

while (!gameEnd) {
  let skipCount = 0;
  for (let i = 0; i < players.length; i++) {
    const isSkip = playerMove(players[i], table, pile);
    if (isSkip) {
      skipCount++;
      if (skipCount === players.length) {
        alert('Draw!!');
        console.log('Draw!!');
        gameEnd = true;
      }
    } else if (players[i].dies.length === 0) {
      alert(`Player ${players[i].id} wins!!`);
      console.log(`Player ${players[i].id} wins!!`);
      gameEnd = true;
    }
    if (gameEnd) {
      break;
    }
  }
}
