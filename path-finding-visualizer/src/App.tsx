import { useState, createContext } from 'react';
import CellGrid from './components/Grid';
import LayoutRoot from './components/LayoutRoot';
import SideNav from './components/SideNav';
import { EditTypes } from './types/edit-types';

export const EditStateContext = createContext<EditTypes>('start');

function App() {
  const [editState, setEditState] = useState<EditTypes>('start');

  return (
    <>
      <SideNav
        editState={editState}
        setEditState={setEditState}
      />
      <LayoutRoot>
        <EditStateContext.Provider value={editState}>
          <CellGrid />
        </EditStateContext.Provider>
      </LayoutRoot>
    </>
  );
}

export default App;
