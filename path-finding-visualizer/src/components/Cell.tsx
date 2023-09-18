import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { CellTypes } from '../types/grid-types';

interface CellProps {
  isMouseDown: boolean;
  type: CellTypes;
  updateCell: (row: number, col: number) => void;
  rowNum: number;
  colNum: number;
}

const Cell: FC<CellProps> = ({ isMouseDown, type, updateCell, rowNum, colNum }) => {
  // Sets initial color to purple
  const dimension = 20;

  const getColorFromType = () => {
    switch (type) {
      case 'start':
        return 'green';
      case 'end':
        return 'red';
      case 'wall':
        return 'black';
      case 'empty':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <Box
      onClick={() => updateCell(rowNum, colNum)}
      // onMouseEnter={() => {
      //   if (isMouseDown) {
      //     nextColor();
      //   }
      // }}
      sx={{
        width: dimension,
        height: dimension,
        backgroundColor: getColorFromType(),
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
};

export default Cell;
