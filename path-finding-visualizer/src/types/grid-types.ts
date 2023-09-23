import { v4 as uuidv4 } from 'uuid';

export type CellTypes = 'start' | 'end' | 'wall' | 'empty';

export interface CellObject {
  type: CellTypes;
  cell: JSX.Element;
  key: uuidv4;
}
