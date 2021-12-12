import { Pile, Player, Table } from './types';
import { getRandomDice, getHighestDice } from './diceFunctions';
import { fillPlayers, pickDices } from './playerFunctions';
import { playerMove, fillPile } from './gameFunctions';

const pile:Pile = fillPile();

const playersAmount = 2;

const players:Player[] = fillPlayers(playersAmount);

pickDices(players, pile);

const table:Table = {
  allDetails: [getRandomDice(pile)],
  availableNumbers() {
    const leftAvailablePlace = this.allDetails[0][0];
    const rightAvailablePlace = this.allDetails[this.allDetails.length - 1][1];
    return [leftAvailablePlace, rightAvailablePlace];
  },
};

players.forEach((el, id) => {
  console.log(`Player ${id} has ${JSON.stringify(el.dice)}`);
});
players.sort((a, b) => {
  if (getHighestDice(a.dice) < getHighestDice(b.dice)) return 1;
  return -1;
});
console.log(`Default pile is ${JSON.stringify(pile)}`);
console.log(`Default table is ${JSON.stringify(table.allDetails)}`);
console.log(`Player ${players[0].id} moves first`);
console.log('\n\r\n\r\n\r');

let gameEnd = false;

let skipCount = 0;
while (!gameEnd) {
  for (let i = 0; i < players.length; i++) {
    const isSkip = playerMove(players[i], table, pile);
    if (isSkip) {
      skipCount++;
      if (skipCount === players.length) {
        alert('Draw!!');
        console.log('Draw!!');
        gameEnd = true;
        break;
      }
    } else if (players[i].dice.length === 0) {
      alert(`Player ${players[i].id} wins!!`);
      console.log(`Player ${players[i].id} wins!!`);
      gameEnd = true;
      break;
    } else {
      skipCount = 0;
    }
  }
}
