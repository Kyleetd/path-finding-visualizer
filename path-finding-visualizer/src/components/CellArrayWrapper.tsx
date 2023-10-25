import { FC, useEffect, useState } from 'react';
import CellArrayDraw, { Position } from './CellArrayDraw';
import { DrawingCellTypes, VisualizationCellObject } from '../types/cell-types';
import CellArrayVisualize from './CellArrayVisualize';
import { AppStates } from '../types/app-state-types';
import { v4 as uuidv4 } from 'uuid';
import { breadthFirstSearch } from '../path-finding-algorithms/breadth-first-search';
import { depthFirstSearch } from '../path-finding-algorithms/depth-first-search';
import { delay } from '../utils/delay';
import { bestFirstSearch } from '../path-finding-algorithms/best-first-search';

interface CellArrayWrapperProps {
  appState: AppStates;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const createDrawingArray = (): DrawingCellTypes[][] => {
  return new Array(25).fill(null).map(() => new Array(35).fill('empty'));
};

const createVisualizationArray = (
  drawingArray: DrawingCellTypes[][],
): VisualizationCellObject[][] => {
  const visualizationArray: VisualizationCellObject[][] = [];

  for (let row = 0; row < drawingArray.length; row++) {
    const newRow: VisualizationCellObject[] = [];
    for (let col = 0; col < drawingArray[row].length; col++) {
      const visualizationCellObject: VisualizationCellObject = {
        visualizationCellType: drawingArray[row][col],
        key: uuidv4(),
      };
      newRow.push(visualizationCellObject);
    }
    visualizationArray.push(newRow);
  }

  return visualizationArray;
};

const CellArrayWrapper: FC<CellArrayWrapperProps> = ({ appState, reset, setReset }) => {
  const [drawingArray, setDrawingArray] = useState<DrawingCellTypes[][]>(createDrawingArray());
  const [visualizationArray, setVisualizationArray] = useState<VisualizationCellObject[][]>([]);
  const [start, setStart] = useState<Position | null>(null);
  const [end, setEnd] = useState<Position | null>(null);

  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    if (reset) {
      window.location.reload();
    }
  }, [reset, setReset]);

  useEffect(() => {
    if (appState === 'visualize') {
      setVisualizationArray(createVisualizationArray(drawingArray));
    }
  }, [appState, drawingArray]);

  useEffect(() => {
    const runAlgorithms = async () => {
      if (appState === 'visualize' && visualizationArray.length > 0 && !running) {
        setRunning(true);
        await breadthFirstSearch(
          createVisualizationArray(drawingArray),
          setVisualizationArray,
          start,
          end,
        );
        await delay(2000);
        await depthFirstSearch(
          createVisualizationArray(drawingArray),
          setVisualizationArray,
          start,
          end,
        );
        await delay(2000);
        await bestFirstSearch(
          createVisualizationArray(drawingArray),
          setVisualizationArray,
          start,
          end,
        );
      }
    };

    runAlgorithms();
  }, [visualizationArray]);

  return (
    <>
      {appState === 'draw' && (
        <CellArrayDraw
          drawingArray={drawingArray}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
        ></CellArrayDraw>
      )}
      {appState === 'visualize' && (
        <CellArrayVisualize visualizationArray={visualizationArray}></CellArrayVisualize>
      )}
    </>
  );
};

export default CellArrayWrapper;
