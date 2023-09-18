import { Drawer, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { EditTypes } from '../types/edit-types';
import { FC } from 'react';

export const SIDE_NAV_WIDTH = 300;

interface SideNavProps {
  editState: EditTypes;
  setEditState: React.Dispatch<React.SetStateAction<EditTypes>>;
}

const SideNav: FC<SideNavProps> = ({ editState, setEditState }) => {
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
      <Stack>
        <ToggleButtonGroup
          color="primary"
          value={editState}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
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
