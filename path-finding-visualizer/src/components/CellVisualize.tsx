import { Box, useMediaQuery } from '@mui/material';
import { FC } from 'react';

interface CellVisualizeProps {
  visualizeCellColor: string;
}

const CellVisualize: FC<CellVisualizeProps> = ({ visualizeCellColor }) => {
  const isExtraSmall = useMediaQuery('(max-width:  1375px)');
  const isSmall = useMediaQuery('(min-width: 1376px) and (max-width:  1450px)');
  const isMedium = useMediaQuery('(min-width: 1451px) and (max-width:  1525px)');
  const isLarge = useMediaQuery('(min-width: 1526px) and (max-width:  1600px)');
  const isExtraLarge = useMediaQuery('(min-width:  1601px)');

  return (
    <div>
      {isExtraSmall && (
        <Box
          sx={{
            width: 15,
            height: 15,
            backgroundColor: visualizeCellColor,
          }}
        />
      )}
      {isSmall && (
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: visualizeCellColor,
          }}
        />
      )}
      {isMedium && (
        <Box
          sx={{
            width: 17,
            height: 17,
            backgroundColor: visualizeCellColor,
          }}
        />
      )}
      {isLarge && (
        <Box
          sx={{
            width: 18,
            height: 18,
            backgroundColor: visualizeCellColor,
          }}
        />
      )}
      {isExtraLarge && (
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: visualizeCellColor,
          }}
        />
      )}
    </div>
  );
};

export default CellVisualize;
