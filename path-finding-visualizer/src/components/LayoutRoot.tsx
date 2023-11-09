import { styled } from '@mui/material/styles';
import { SIDE_NAV_WIDTH } from './SideNav';

const LayoutRoot = styled('div')(() => ({
  display: 'flex',
  height: '100vh',
  maxWidth: '100%',
  marginLeft: SIDE_NAV_WIDTH + 50,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'lightgrey',
}));

export default LayoutRoot;
