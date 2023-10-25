import { Box } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { EditStateContext } from '../App';
import { Position } from './CellArrayDraw';
import { DrawingCellTypes } from '../types/cell-types';

interface CellDrawProps {
  rowNum: number;
  colNum: number;
  drawingArray: DrawingCellTypes[][];
  start: Position | null;
  setStart: React.Dispatch<React.SetStateAction<Position | null>>;
  end: Position | null;
  setEnd: React.Dispatch<React.SetStateAction<Position | null>>;
}

const getColor = (cellType: DrawingCellTypes) => {
  switch (cellType) {
    case 'empty':
      return 'gray';
    case 'wall':
      return 'black';
    case 'start':
      return 'lightgreen';
    case 'end':
      return 'red';
    default:
      throw new Error('Invalid Edit State');
  }
};

const CellDraw: FC<CellDrawProps> = ({
  rowNum,
  colNum,
  drawingArray,
  start,
  setStart,
  end,
  setEnd,
}) => {
  const editState = useContext(EditStateContext);
  const [color, setColor] = useState(getColor(drawingArray[rowNum][colNum]));
  const dimension = 30;

  useEffect(() => {
    setColor(getColor(drawingArray[rowNum][colNum]));
  }, [drawingArray, setColor, rowNum, colNum]);

  useEffect(() => {
    if (start) {
      if (color === 'lightgreen' && (start.row !== rowNum || start.col !== colNum)) {
        setColor('gray');
        drawingArray[rowNum][colNum] = 'empty';
      }
    }
  }, [start, colNum, color, rowNum, drawingArray]);

  useEffect(() => {
    if (end) {
      if (color === 'red' && (end.row !== rowNum || end.col !== colNum)) {
        setColor('gray');
        drawingArray[rowNum][colNum] = 'empty';
      }
    }
  }, [end, colNum, color, rowNum, drawingArray]);

  const updateColorOnClick = () => {
    switch (editState) {
      case 'start':
        if (color === 'gray') {
          setStart({
            row: rowNum,
            col: colNum,
          });
          setColor('lightgreen');
          drawingArray[rowNum][colNum] = 'start';
        }
        break;
      case 'end':
        if (color === 'gray') {
          setEnd({
            row: rowNum,
            col: colNum,
          });
          setColor('red');
          drawingArray[rowNum][colNum] = 'end';
        }
        break;
      case 'draw wall':
        setColor('black');
        drawingArray[rowNum][colNum] = 'wall';
        break;
      case 'erase wall':
        setColor('gray');
        drawingArray[rowNum][colNum] = 'empty';
        break;
      default:
        throw new Error('Invalid Edit State');
    }
  };
  const updateColorOnEnter = () => {
    if (editState === 'draw wall') {
      if (color === 'gray') {
        setColor('black');
        drawingArray[rowNum][colNum] = 'wall';
      }
    } else if (editState === 'erase wall') {
      if (color === 'black') {
        setColor('gray');
        drawingArray[rowNum][colNum] = 'empty';
      }
    }
  };

  return (
    <Box
      onClick={() => updateColorOnClick()}
      onMouseEnter={() => {
        updateColorOnEnter();
      }}
      sx={{
        width: dimension,
        height: dimension,
        backgroundColor: color,
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
};

export default CellDraw;
