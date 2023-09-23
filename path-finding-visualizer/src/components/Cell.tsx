import { Box } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { EditStateContext } from '../App';
import { Position } from './Grid';

interface CellProps {
  rowNum: number;
  colNum: number;
  strArray: string[][];
  start: Position | null;
  setStart: React.Dispatch<React.SetStateAction<Position | null>>;
  end: Position | null;
  setEnd: React.Dispatch<React.SetStateAction<Position | null>>;
}

const Cell: FC<CellProps> = ({ rowNum, colNum, strArray, start, setStart, end, setEnd }) => {
  const editState = useContext(EditStateContext);
  const [color, setColor] = useState('gray');

  const dimension = 20;

  useEffect(() => {
    if (start) {
      if (color === 'lightgreen' && (start.row !== rowNum || start.col !== colNum)) {
        setColor('gray');
        console.log('start changed: ', start);
      }
    }
  }, [start, colNum, color, rowNum]);

  useEffect(() => {
    if (end) {
      if (color === 'red' && (end.row !== rowNum || end.col !== colNum)) {
        setColor('gray');
        console.log('end changed: ', end);
      }
    }
  }, [end, colNum, color, rowNum]);

  const updateColorOnClick = () => {
    switch (editState) {
      case 'start':
        if (color === 'gray') {
          setStart({
            row: rowNum,
            col: colNum,
          });
          setColor('lightgreen');
          strArray[rowNum][colNum] = 's';
        }
        break;
      case 'end':
        if (color === 'gray') {
          setEnd({
            row: rowNum,
            col: colNum,
          });
          setColor('red');
          strArray[rowNum][colNum] = 'e';
        }
        break;
      case 'draw wall':
        setColor('purple');
        strArray[rowNum][colNum] = 'w';
        break;
      case 'erase wall':
        setColor('gray');
        strArray[rowNum][colNum] = 'n';
        break;
      default:
        throw new Error('Invalid Edit State');
    }
  };
  const updateColorOnEnter = () => {
    if (editState === 'draw wall') {
      if (color === 'gray') {
        setColor('purple');
        strArray[rowNum][colNum] = 'w';
      }
    } else if (editState === 'erase wall') {
      if (color === 'purple') {
        setColor('gray');
        strArray[rowNum][colNum] = 'n';
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

export default Cell;
