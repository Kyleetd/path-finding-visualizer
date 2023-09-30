import { Grid } from '@mui/material';
import CellDraw from './CellDraw';
import { useState } from 'react';

export type Position = {
  row: number;
  col: number;
};

const CellGridDraw = () => {
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
          {row.map((_, cellIndex) => (
            <Grid
              item
              role="cell"
              key={cellIndex}
            >
              <CellDraw
                rowNum={rowIndex}
                colNum={cellIndex}
                drawingArray={stringArray}
                start={start}
                setStart={setStart}
                end={end}
                setEnd={setEnd}
              ></CellDraw>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default CellGridDraw;
