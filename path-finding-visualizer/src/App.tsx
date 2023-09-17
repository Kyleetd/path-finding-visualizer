import CellGrid from './components/Grid';
import LayoutRoot from './components/LayoutRoot';
import SideNav from './components/SideNav';

function App() {
  return (
    <>
      <SideNav />
      <LayoutRoot>
        <CellGrid />
      </LayoutRoot>
    </>
  );
}

export default App;
