import { useState } from 'react';
import CellGrid from './components/Grid';
import LayoutRoot from './components/LayoutRoot';
import SideNav from './components/SideNav';
import { EditTypes } from './types/edit-types';

function App() {
  const [editState, setEditState] = useState<EditTypes>('start');

  return (
    <>
      <SideNav
        editState={editState}
        setEditState={setEditState}
      />
      <LayoutRoot>
        <CellGrid editState={editState} />
      </LayoutRoot>
    </>
  );
}

export default App;
