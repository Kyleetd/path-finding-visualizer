import { Grid } from '@mui/material';
import Cell from './Cell';

const CellGrid = () => {
  const createGrid = () => {
    const grid = [];
    const gridSize = 20;
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(<Cell />);
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
