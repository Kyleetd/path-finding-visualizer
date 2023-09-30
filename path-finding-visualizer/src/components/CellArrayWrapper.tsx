import { FC, useEffect, useState } from 'react';
import CellArrayDraw from './CellArrayDraw';
import { DrawingCellTypes, VisualizationCellObject } from '../types/cell-types';
import CellArrayVisualize from './CellArrayVisualize';
import { AppStates } from '../types/app-state-types';
import { v4 as uuidv4 } from 'uuid';

interface CellArrayWrapperProps {
  appState: AppStates;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const createDrawingArray = (): DrawingCellTypes[][] => {
  return new Array(30).fill(null).map(() => new Array(40).fill('empty'));
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

  useEffect(() => {
    if (reset) {
      setDrawingArray(createDrawingArray());
      setVisualizationArray([]);
      setReset(false);
    }
  }, [reset, setReset]);

  useEffect(() => {
    if (appState === 'visualize') {
      setVisualizationArray(createVisualizationArray(drawingArray));
    }
  }, [appState, drawingArray]);

  return (
    <>
      {appState === 'draw' && <CellArrayDraw drawingArray={drawingArray}></CellArrayDraw>}
      {appState === 'visualize' && (
        <CellArrayVisualize visualizationArray={visualizationArray}></CellArrayVisualize>
      )}
    </>
  );
};

export default CellArrayWrapper;
