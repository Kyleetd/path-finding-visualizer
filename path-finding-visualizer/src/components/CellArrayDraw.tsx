import { Grid } from '@mui/material';
import CellDraw from './CellDraw';
import { FC } from 'react';
import { DrawingCellTypes } from '../types/cell-types';

export type Position = {
  row: number;
  col: number;
};

interface CellArrayDrawProps {
  drawingArray: DrawingCellTypes[][];
  start: Position | null;
  setStart: React.Dispatch<React.SetStateAction<Position | null>>;
  end: Position | null;
  setEnd: React.Dispatch<React.SetStateAction<Position | null>>;
}

const CellArrayDraw: FC<CellArrayDrawProps> = ({ drawingArray, start, setStart, end, setEnd }) => {
  return (
    <Grid
      container
      // spacing={0.25}
      role="grid"
    >
      {drawingArray.map((row, rowIndex) => (
        <Grid
          container
          item
          xs={12}
          // spacing={0.25}
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
