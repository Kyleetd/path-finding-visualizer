import { Box } from '@mui/material';
import { useState } from 'react';

const Cell = () => {
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
    <div onClick={() => nextColor()}>
      <Box
        sx={{
          width: dimension,
          height: dimension,
          backgroundColor: color,
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
    </div>
  );
};

export default Cell;
