import { Drawer, Stack, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { EditTypes } from '../types/edit-types';
import { FC } from 'react';

export const SIDE_NAV_WIDTH = 300;

interface SideNavProps {
  editState: EditTypes;
  setEditState: React.Dispatch<React.SetStateAction<EditTypes>>;
  startState: boolean;
  setStartState: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav: FC<SideNavProps> = ({ editState, setEditState, startState, setStartState }) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newEditState: EditTypes) => {
    setEditState(newEditState);
  };

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      open
      PaperProps={{
        sx: {
          width: SIDE_NAV_WIDTH,
          padding: '25px',
          backgroundColor: 'lightgray',
        },
      }}
    >
      <Stack spacing={'10px'}>
        <Button
          variant="outlined"
          onClick={() => {
            setStartState(!startState);
          }}
        >
          {startState ? <>Stop</> : <>Start</>}
        </Button>
        <Button
          variant="outlined"
          disabled={startState}
        >
          Reset
        </Button>
        <ToggleButtonGroup
          color="primary"
          value={editState}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          disabled={startState}
        >
          <ToggleButton value="start">Add Start</ToggleButton>
          <ToggleButton value="end">Add End</ToggleButton>
          <ToggleButton value="draw wall">Draw Wall</ToggleButton>
          <ToggleButton value="erase wall">Erase Wall</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Drawer>
  );
};

export default SideNav;
