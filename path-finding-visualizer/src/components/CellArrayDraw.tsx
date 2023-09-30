import { Grid } from '@mui/material';
import CellDraw from './CellDraw';
import { FC, useState } from 'react';
import { DrawingCellTypes } from '../types/cell-types';

export type Position = {
  row: number;
  col: number;
};

interface CellArrayDrawProps {
  drawingArray: DrawingCellTypes[][];
}

const CellArrayDraw: FC<CellArrayDrawProps> = ({ drawingArray }) => {
  const [start, setStart] = useState<Position | null>(null);
  const [end, setEnd] = useState<Position | null>(null);

  return (
    <Grid
      container
      spacing={0.25}
      role="grid"
    >
      {drawingArray.map((row, rowIndex) => (
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
                drawingArray={drawingArray}
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

export default CellArrayDraw;
