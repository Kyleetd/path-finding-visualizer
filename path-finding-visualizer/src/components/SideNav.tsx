import {
  Drawer,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Alert,
  Divider,
  Grid,
} from '@mui/material';
import { EditTypes } from '../types/edit-types';
import { FC, useEffect } from 'react';
import { AppStates } from '../types/app-state-types';
import { AlgorithmResultObject, Algorithms } from '../types/algorithm-result';

export const SIDE_NAV_WIDTH = 300;

interface SideNavProps {
  editState: EditTypes;
  setEditState: React.Dispatch<React.SetStateAction<EditTypes>>;
  appState: AppStates;
  setAppState: React.Dispatch<React.SetStateAction<AppStates>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  algorithmResults: AlgorithmResultObject[];
  selectedAlgorithm: Algorithms | undefined;
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<Algorithms | undefined>>;
}

const SideNav: FC<SideNavProps> = ({
  editState,
  setEditState,
  appState,
  setAppState,
  setReset,
  error,
  setError,
  algorithmResults,
  selectedAlgorithm,
  setSelectedAlgorithm,
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
        {algorithmResults.length > 0 && <Divider />}
        {algorithmResults.map((algorithmResult, index) => (
          <Button
            variant="contained"
            onClick={() => {
              setSelectedAlgorithm(algorithmResult.algorithmName);
            }}
            disabled={appState !== 'analyze'}
            sx={{
              height: '48px',
              '&:disabled': {
                color: 'white',
              },
            }}
            style={
              algorithmResult.algorithmName === selectedAlgorithm
                ? { backgroundColor: '#000080' }
                : {}
            }
            key={algorithmResult.key}
          >
            <Grid
              container
              height="100%"
            >
              <Grid
                item
                xs={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {index + 1}.
              </Grid>
              <Grid
                item
                xs={9}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {algorithmResult.algorithmName}:
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {algorithmResult.time ? <>{algorithmResult.time} s</> : <>-</>}
              </Grid>
            </Grid>
          </Button>
        ))}
      </Stack>
    </Drawer>
  );
};

export default SideNav;
