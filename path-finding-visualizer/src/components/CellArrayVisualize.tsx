import { FC } from 'react';
import { VisualizationCellObject } from '../types/cell-types';
import { Grid } from '@mui/material';
import CellVisualize from './CellVisualize';

interface CellArrayVisualizeProps {
  visualizationArray: VisualizationCellObject[][];
}

const getCellColor = (cellType: string): string => {
  switch (cellType) {
    case 'empty':
      return 'gray';
    case 'start':
      return 'lightgreen';
    case 'end':
      return 'red';
    case 'wall':
      return 'black';
    case 'openset':
      return 'lightblue';
    case 'searched':
      return 'blue';
    case 'path':
      return 'orange';
    case 'current':
      return 'purple';
    default:
      return 'gray';
  }
};

const CellArrayVisualize: FC<CellArrayVisualizeProps> = ({ visualizationArray }) => {
  return (
    <Grid
      container
      // spacing={0.25}
      role="grid"
    >
      {visualizationArray.map((row, rowIndex) => (
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
          {row.map((cell) => (
            <Grid
              item
              role="cell"
              key={cell.key}
            >
              <CellVisualize
                visualizeCellColor={getCellColor(cell.visualizationCellType)}
              ></CellVisualize>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default CellArrayVisualize;
