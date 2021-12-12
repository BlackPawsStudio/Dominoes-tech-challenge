export type Dice = [number, number];

export type Pile = Dice[];

export interface Player {
  id: number;
  dice: Dice[];
}

export interface Table {
  allDetails: Dice[];
  availableNumbers: () => Available
}

export type Available = [number, number];
