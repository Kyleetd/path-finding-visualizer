import { styled } from '@mui/material/styles';
import { SIDE_NAV_WIDTH } from './SideNav';

const LayoutRoot = styled('div')(() => ({
    display: 'flex',
    height: '100vh',
    maxWidth: '100%',
    marginLeft: SIDE_NAV_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
}))

export default LayoutRoot;