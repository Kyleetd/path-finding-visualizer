import { Grid } from '@mui/material';
import Cell from './Cell';
import { useState } from 'react';

const CellGrid = () => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  window.addEventListener('mousedown', function () {
    setMouseDown(true);
    console.log('mouse down');
  });

  window.addEventListener('mouseup', function () {
    setMouseDown(false);
    console.log('mouse up');
  });

  const createGrid = () => {
    const grid = [];
    const rows = 30;
    const columns = 40;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(<Cell isMouseDown={mouseDown} />);
      }
      grid.push(row);
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
          {row.map((cell, cellIndex) => (
            <Grid
              item
              role="cell"
              key={cellIndex}
            >
              {cell}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default CellGrid;
