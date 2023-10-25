import { Position } from '../components/CellArrayDraw';

export const stringifyPosition = (position: Position) => {
  return `${position.row},${position.col}`;
};

export const unstringifyPosition = (positionString: string) => {
  const positionArray = positionString.split(',');
  const position: Position = {
    row: Number(positionArray[0]),
    col: Number(positionArray[1]),
  };
  return position;
};
