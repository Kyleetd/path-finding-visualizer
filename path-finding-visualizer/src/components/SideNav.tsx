import { Drawer, Stack, ToggleButton, ToggleButtonGroup, Button, Alert } from '@mui/material';
import { EditTypes } from '../types/edit-types';
import { FC, useEffect } from 'react';
import { AppStates } from '../types/app-state-types';

export const SIDE_NAV_WIDTH = 300;

interface SideNavProps {
  editState: EditTypes;
  setEditState: React.Dispatch<React.SetStateAction<EditTypes>>;
  appState: AppStates;
  setAppState: React.Dispatch<React.SetStateAction<AppStates>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
}

const SideNav: FC<SideNavProps> = ({
  editState,
  setEditState,
  appState,
  setAppState,
  setReset,
  error,
  setError,
}) => {
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error, setError]);
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
        {error && (
          <Alert
            severity="error"
            sx={{
              height: '36px',
            }}
          >
            {error.message}
          </Alert>
        )}
        <Button
          variant="contained"
          disabled={appState !== 'draw'}
          onClick={() => {
            setAppState('visualize');
          }}
          sx={{
            height: '48px',
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
          sx={{
            height: '48px',
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
          sx={{
            height: '48px',
          }}
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
