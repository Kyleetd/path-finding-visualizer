import { Position } from '../components/CellArrayDraw';
import { VisualizationCellObject } from '../types/cell-types';
import { delay } from './delay';
import { stringifyPosition, unstringifyPosition } from './stringifyPosition';
import { v4 as uuidv4 } from 'uuid';

export const drawPath = async (
  cameFrom: { [key: string]: string },
  start: Position,
  end: Position,
  cellVisualizeArray: VisualizationCellObject[][],
  setCellVisualizeArray: React.Dispatch<React.SetStateAction<VisualizationCellObject[][]>>,
) => {
  let currentPositionString = stringifyPosition(end);
  const startPositionString = stringifyPosition(start);
  while (true) {
    // get the cell currentPositionString came from
    currentPositionString = cameFrom[currentPositionString];

    if (currentPositionString === startPositionString) {
      break;
    }

    // colour cell
    const currentPosition = unstringifyPosition(currentPositionString);
    cellVisualizeArray[currentPosition.row][currentPosition.col] = {
      visualizationCellType: 'path',
      key: uuidv4(),
    };
    setCellVisualizeArray([...cellVisualizeArray]);
    await delay(50);
  }
};
