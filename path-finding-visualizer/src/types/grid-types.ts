export type CellTypes = 'start' | 'end' | 'wall' | 'empty';

export interface CellObject {
  type: CellTypes;
  cell: JSX.Element;
}
