import { Grid } from '@mui/material';
import Cell from './Cell';
import { useState } from 'react';

export type Position = {
  row: number;
  col: number;
};

const CellGrid = () => {
  const [stringArray] = useState(new Array(30).fill(null).map(() => new Array(40).fill('n')));

  const [start, setStart] = useState<Position | null>(null);
  const [end, setEnd] = useState<Position | null>(null);

  return (
    <Grid
      container
      spacing={0.25}
      role="grid"
    >
      {stringArray.map((row, rowIndex) => (
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
              <Cell
                rowNum={rowIndex}
                colNum={cellIndex}
                strArray={stringArray}
                start={start}
                setStart={setStart}
                end={end}
                setEnd={setEnd}
              ></Cell>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default CellGrid;
