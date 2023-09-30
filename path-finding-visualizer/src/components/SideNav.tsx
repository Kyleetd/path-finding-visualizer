import { Drawer, Stack, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { EditTypes } from '../types/edit-types';
import { FC } from 'react';
import { AppStates } from '../types/app-state-types';

export const SIDE_NAV_WIDTH = 300;

interface SideNavProps {
  editState: EditTypes;
  setEditState: React.Dispatch<React.SetStateAction<EditTypes>>;
  appState: AppStates;
  setAppState: React.Dispatch<React.SetStateAction<AppStates>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav: FC<SideNavProps> = ({
  editState,
  setEditState,
  appState,
  setAppState,
  setReset,
}) => {
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
          backgroundColor: 'gray',
        },
      }}
    >
      <Stack spacing={'10px'}>
        <Button
          variant="contained"
          disabled={appState !== 'draw'}
          onClick={() => {
            setAppState('visualize');
          }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setReset(true);
            setAppState('draw');
          }}
        >
          Reset
        </Button>
        <ToggleButtonGroup
          color="primary"
          value={editState}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          disabled={appState !== 'draw'}
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
