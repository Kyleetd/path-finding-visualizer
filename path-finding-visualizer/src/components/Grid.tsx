import { Grid } from '@mui/material';
import Cell from './Cell';
import { FC, useState } from 'react';
import { CellObject } from '../types/grid-types';
import { EditTypes } from '../types/edit-types';

interface CellGridProps {
  editState: EditTypes;
}

const CellGrid: FC<CellGridProps> = ({ editState }) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  window.addEventListener('mousedown', function () {
    setMouseDown(true);
  });

  window.addEventListener('mouseup', function () {
    setMouseDown(false);
  });

  const changeCellCol = (row: number, col: number) => {
    console.log(row, col);
  };

  const createGrid = () => {
    const grid: CellObject[][] = [];
    const rows = 30;
    const columns = 40;
    for (let row = 0; row < rows; row++) {
      const currRow = [];
      for (let column = 0; column < columns; column++) {
        const cell: CellObject = {
          type: 'empty',
          cell: (
            <Cell
              isMouseDown={mouseDown}
              type="empty"
              updateCell={changeCellCol}
              rowNum={row}
              colNum={column}
            />
          ),
        };
        currRow.push(cell);
      }
      grid.push(currRow);
    }
    return grid;
  };

  const grid = createGrid();

  return (
    <Grid
      container
      spacing={0.25}
      role="grid"
    >
      {grid.map((row, rowIndex) => (
        <Grid
          container
          item
          xs={12}
          spacing={0.25}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          role="row"
          key={rowIndex}
        >
          {row.map((cellObject, cellIndex) => (
            <Grid
              item
              role="cell"
              key={cellIndex}
            >
              {cellObject.cell}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default CellGrid;
