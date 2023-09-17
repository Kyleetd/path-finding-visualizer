import { Box } from '@mui/material';
import { FC, useState } from 'react';

interface CellProps {
  isMouseDown: boolean;
}

const Cell: FC<CellProps> = ({ isMouseDown }) => {
  // Sets initial color to purple
  const [color, setColor] = useState('purple');

  const colors = ['purple', 'green', 'red', 'blue'];
  const dimension = 20;

  const nextColor = () => {
    const index = colors.indexOf(color);
    const next = (index + 1) % colors.length;
    setColor(colors[next]);
  };

  return (
    <Box
      onClick={() => nextColor()}
      onMouseEnter={() => {
        if (isMouseDown) {
          nextColor();
        }
      }}
      sx={{
        width: dimension,
        height: dimension,
        backgroundColor: color,
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
};

export default Cell;
