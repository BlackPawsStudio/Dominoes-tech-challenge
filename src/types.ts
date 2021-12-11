export type Die = number[];

export type Pile = Die[];

export interface Player {
  id: number;
  dies: Die[];
}

export interface Table {
  allDetails: Die[];
  available: () => Available
}

export type Available = [number, number];
