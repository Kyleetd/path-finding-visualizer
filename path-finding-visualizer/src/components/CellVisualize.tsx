import { Box } from '@mui/material';
import { FC } from 'react';

interface CellVisualizeProps {
  visualizeCellColor: string;
}

const CellVisualize: FC<CellVisualizeProps> = ({ visualizeCellColor }) => {
  const dimension = 15;

  return (
    <Box
      sx={{
        width: dimension,
        height: dimension,
        backgroundColor: visualizeCellColor,
      }}
    />
  );
};

export default CellVisualize;
