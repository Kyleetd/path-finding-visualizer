import { Drawer } from '@mui/material';

export const SIDE_NAV_WIDTH = 300;

const SideNav = () => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      open
      PaperProps={{
        sx: {
          width: SIDE_NAV_WIDTH,
          backgroundColor: 'blue',
        },
      }}
    ></Drawer>
  );
};

export default SideNav;
