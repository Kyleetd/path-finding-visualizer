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
import { AlgorithmResultObject, Algorithms } from '../types/algorithm-result';

interface CellArrayWrapperProps {
  appState: AppStates;
  setAppState: React.Dispatch<React.SetStateAction<AppStates>>;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  algorithmResults: AlgorithmResultObject[];
  setAlgorithmResult: React.Dispatch<React.SetStateAction<AlgorithmResultObject[]>>;
  selectedAlgorithm: Algorithms | undefined;
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<Algorithms | undefined>>;
}

const createDrawingArray = (): DrawingCellTypes[][] => {
  return new Array(30).fill(null).map(() => new Array(50).fill('empty'));
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

const CellArrayWrapper: FC<CellArrayWrapperProps> = ({
  appState,
  setAppState,
  reset,
  setReset,
  setError,
  algorithmResults,
  setAlgorithmResult,
  selectedAlgorithm,
  setSelectedAlgorithm,
}) => {
  const [drawingArray] = useState<DrawingCellTypes[][]>(createDrawingArray());
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
      if (!start || !end) {
        setError(Error('Select Start and End positions.'));
        setAppState('draw');
        return;
      }
      setVisualizationArray(createVisualizationArray(drawingArray));
    }
  }, [appState, drawingArray, end, setAppState, setError, start]);

  useEffect(() => {
    const runAlgorithms = async () => {
      if (appState === 'visualize' && visualizationArray.length > 0 && !running) {
        setRunning(true);
        setAlgorithmResult((previousAlgorithmResults) => [
          ...previousAlgorithmResults,
          {
            visualizationGrid: visualizationArray,
            time: null,
            algorithmName: 'Breadth First Search' as Algorithms,
            key: uuidv4(),
          },
        ]);
        setSelectedAlgorithm('Breadth First Search');
        const bfsResult = await breadthFirstSearch(
          createVisualizationArray(drawingArray),
          setVisualizationArray,
          start as Position,
          end as Position,
        );
        setAlgorithmResult((previousAlgorithmResults) =>
          [
            ...previousAlgorithmResults.slice(0, -1),
            {
              visualizationGrid: bfsResult.visualizationArray,
              time: bfsResult.time,
              algorithmName: 'Breadth First Search' as Algorithms,
              key: uuidv4(),
            },
          ].sort((a, b) => Number(a.time) - Number(b.time)),
        );
        await delay(2000);
        setAlgorithmResult((previousAlgorithmResults) => [
          ...previousAlgorithmResults,
          {
            visualizationGrid: visualizationArray,
            time: null,
            algorithmName: 'Depth First Search' as Algorithms,
            key: uuidv4(),
          },
        ]);
        setSelectedAlgorithm('Depth First Search');
        const dfsResult = await depthFirstSearch(
          createVisualizationArray(drawingArray),
          setVisualizationArray,
          start as Position,
          end as Position,
        );
        setAlgorithmResult((previousAlgorithmResults) =>
          [
            ...previousAlgorithmResults.slice(0, -1),
            {
              visualizationGrid: dfsResult.visualizationArray,
              time: dfsResult.time,
              algorithmName: 'Depth First Search' as Algorithms,
              key: uuidv4(),
            },
          ].sort((a, b) => Number(a.time) - Number(b.time)),
        );
        await delay(2000);
        setAlgorithmResult((previousAlgorithmResults) => [
          ...previousAlgorithmResults,
          {
            visualizationGrid: visualizationArray,
            time: null,
            algorithmName: 'Best First Search' as Algorithms,
            key: uuidv4(),
          },
        ]);
        setSelectedAlgorithm('Best First Search');
        const bestfsResult = await bestFirstSearch(
          createVisualizationArray(drawingArray),
          setVisualizationArray,
          start as Position,
          end as Position,
        );
        setAlgorithmResult((previousAlgorithmResults) =>
          [
            ...previousAlgorithmResults.slice(0, -1),
            {
              visualizationGrid: bestfsResult.visualizationArray,
              time: bestfsResult.time,
              algorithmName: 'Best First Search' as Algorithms,
              key: uuidv4(),
            },
          ].sort((a, b) => Number(a.time) - Number(b.time)),
        );
        await delay(2000);
        setAppState('analyze');
      }
    };

    runAlgorithms();
  }, [
    algorithmResults,
    appState,
    drawingArray,
    end,
    running,
    setAlgorithmResult,
    setAppState,
    setSelectedAlgorithm,
    start,
    visualizationArray,
  ]);

  useEffect(() => {
    if (appState === 'analyze') {
      const algorithmResult = algorithmResults.find(
        (obj) => obj.algorithmName === selectedAlgorithm,
      );
      if (algorithmResult?.visualizationGrid) {
        console.log(algorithmResult.visualizationGrid);
        setVisualizationArray(algorithmResult.visualizationGrid);
      }
    }
  }, [algorithmResults, appState, selectedAlgorithm]);

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
      {(appState === 'visualize' || appState === 'analyze') && (
        <CellArrayVisualize visualizationArray={visualizationArray}></CellArrayVisualize>
      )}
    </>
  );
};

export default CellArrayWrapper;
