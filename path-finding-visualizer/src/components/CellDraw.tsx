import { Box, useMediaQuery } from '@mui/material';
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
  mouseDown: boolean;
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
  mouseDown,
}) => {
  const editState = useContext(EditStateContext);
  const [color, setColor] = useState(getColor(drawingArray[rowNum][colNum]));

  const isExtraSmall = useMediaQuery('(max-width:  1375px)');
  const isSmall = useMediaQuery('(min-width: 1376px) and (max-width:  1450px)');
  const isMedium = useMediaQuery('(min-width: 1451px) and (max-width:  1525px)');
  const isLarge = useMediaQuery('(min-width: 1526px) and (max-width:  1600px)');
  const isExtraLarge = useMediaQuery('(min-width:  1601px)');

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
      default:
        throw new Error('Invalid Edit State');
    }
  };

  const updateColorOnEnter = () => {
    if (editState === 'draw wall' && mouseDown) {
      if (color === 'gray') {
        setColor('black');
        drawingArray[rowNum][colNum] = 'wall';
      }
    } else if (editState === 'erase wall' && mouseDown) {
      if (color === 'black') {
        setColor('gray');
        drawingArray[rowNum][colNum] = 'empty';
      }
    }
  };

  const updateColorOnDown = () => {
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
    <div>
      {isExtraSmall && (
        <Box
          onClick={() => updateColorOnClick()}
          onMouseEnter={() => {
            updateColorOnEnter();
          }}
          onMouseDown={() => {
            updateColorOnDown();
          }}
          sx={{
            width: 18.5,
            height: 18.5,
            backgroundColor: color,
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
            userDrag: 'none',
            userSelect: 'none',
          }}
        />
      )}
      {isSmall && (
        <Box
          onClick={() => updateColorOnClick()}
          onMouseEnter={() => {
            updateColorOnEnter();
          }}
          onMouseDown={() => {
            updateColorOnDown();
          }}
          sx={{
            width: 20,
            height: 20,
            backgroundColor: color,
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
            userDrag: 'none',
            userSelect: 'none',
          }}
        />
      )}
      {isMedium && (
        <Box
          onClick={() => updateColorOnClick()}
          onMouseEnter={() => {
            updateColorOnEnter();
          }}
          onMouseDown={() => {
            updateColorOnDown();
          }}
          sx={{
            width: 21.5,
            height: 21.5,
            backgroundColor: color,
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
            userDrag: 'none',
            userSelect: 'none',
          }}
        />
      )}
      {isLarge && (
        <Box
          onClick={() => updateColorOnClick()}
          onMouseEnter={() => {
            updateColorOnEnter();
          }}
          onMouseDown={() => {
            updateColorOnDown();
          }}
          sx={{
            width: 23,
            height: 23,
            backgroundColor: color,
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
            userDrag: 'none',
            userSelect: 'none',
          }}
        />
      )}
      {isExtraLarge && (
        <Box
          onClick={() => updateColorOnClick()}
          onMouseEnter={() => {
            updateColorOnEnter();
          }}
          onMouseDown={() => {
            updateColorOnDown();
          }}
          sx={{
            width: 24.5,
            height: 24.5,
            backgroundColor: color,
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
            userDrag: 'none',
            userSelect: 'none',
          }}
        />
      )}
    </div>
  );
};

export default CellDraw;
