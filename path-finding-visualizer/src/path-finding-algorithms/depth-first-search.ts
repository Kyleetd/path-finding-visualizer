import { Position } from '../components/CellArrayDraw';
import { VisualizationCellObject } from '../types/cell-types';
import { v4 as uuidv4 } from 'uuid';
import { delay } from '../utils/delay';
import { drawPath } from '../utils/drawPath';
import { stringifyPosition } from '../utils/stringifyPosition';

export const depthFirstSearch = async (
  cellVisualizeArray: VisualizationCellObject[][],
  setCellVisualizeArray: React.Dispatch<React.SetStateAction<VisualizationCellObject[][]>>,
  start: Position,
  end: Position,
) => {
  return new Promise((resolve) => {
    async function asyncFunction() {
      const stack = [start];
      const visited: boolean[][] = new Array(cellVisualizeArray.length)
        .fill(null)
        .map(() => new Array(cellVisualizeArray[0].length).fill(false));
      visited[start.row][start.col] = true;
      const cameFrom: { [key: string]: string } = {};

      while (stack.length > 0) {
        const cell: Position = stack.pop() as Position;

        // mark cell as current (if not start or end)
        if (
          (cell.row !== start.row || cell.col !== start.col) &&
          (cell.row !== end.row || cell.col !== end.col)
        ) {
          cellVisualizeArray[cell.row][cell.col] = {
            visualizationCellType: 'current',
            key: uuidv4(),
          };
        }

        // update Cell Visualization Array and wait for 50 ms
        setCellVisualizeArray([...cellVisualizeArray]);
        await delay(50);

        // stop searching if end cell is reached
        if (cell.row === end.row && cell.col === end.col) {
          await drawPath(cameFrom, start, end, cellVisualizeArray, setCellVisualizeArray);
          resolve('Found End Point');
          break;
        }

        // add cell above current cell if valid
        if (
          cell.row - 1 >= 0 &&
          !visited[cell.row - 1][cell.col] &&
          cellVisualizeArray[cell.row - 1][cell.col].visualizationCellType != 'wall'
        ) {
          const up: Position = {
            row: cell.row - 1,
            col: cell.col,
          };
          stack.push(up);
          if (up.row !== end.row || up.col !== end.col) {
            cellVisualizeArray[up.row][up.col] = {
              visualizationCellType: 'openset',
              key: uuidv4(),
            };
          }
          visited[up.row][up.col] = true;
          cameFrom[stringifyPosition(up)] = stringifyPosition(cell);
        }

        // add cell to left of current cell if valid
        if (
          cell.col - 1 >= 0 &&
          !visited[cell.row][cell.col - 1] &&
          cellVisualizeArray[cell.row][cell.col - 1].visualizationCellType != 'wall'
        ) {
          const left: Position = {
            row: cell.row,
            col: cell.col - 1,
          };
          stack.push(left);
          if (left.row !== end.row || left.col !== end.col) {
            cellVisualizeArray[left.row][left.col] = {
              visualizationCellType: 'openset',
              key: uuidv4(),
            };
          }
          visited[left.row][left.col] = true;
          cameFrom[stringifyPosition(left)] = stringifyPosition(cell);
        }

        // add cell below current cell if valid
        if (
          cell.row + 1 < cellVisualizeArray.length &&
          !visited[cell.row + 1][cell.col] &&
          cellVisualizeArray[cell.row + 1][cell.col].visualizationCellType != 'wall'
        ) {
          const down: Position = {
            row: cell.row + 1,
            col: cell.col,
          };
          stack.push(down);
          if (down.row !== end.row || down.col !== end.col) {
            cellVisualizeArray[down.row][down.col] = {
              visualizationCellType: 'openset',
              key: uuidv4(),
            };
          }
          visited[down.row][down.col] = true;
          cameFrom[stringifyPosition(down)] = stringifyPosition(cell);
        }

        // add cell to right of current cell if valid
        if (
          cell.col + 1 < cellVisualizeArray[0].length &&
          !visited[cell.row][cell.col + 1] &&
          cellVisualizeArray[cell.row][cell.col + 1].visualizationCellType != 'wall'
        ) {
          const right: Position = {
            row: cell.row,
            col: cell.col + 1,
          };
          stack.push(right);
          if (right.row !== end.row || right.col !== end.col) {
            cellVisualizeArray[right.row][right.col] = {
              visualizationCellType: 'openset',
              key: uuidv4(),
            };
          }
          visited[right.row][right.col] = true;
          cameFrom[stringifyPosition(right)] = stringifyPosition(cell);
        }

        // mark current cell as searched if not start cell
        if (cell.row !== start.row || cell.col !== start.col) {
          cellVisualizeArray[cell.row][cell.col] = {
            visualizationCellType: 'searched',
            key: uuidv4(),
          };
        }
      }
      resolve('No Path To End');
    }
    asyncFunction();
  });
};
