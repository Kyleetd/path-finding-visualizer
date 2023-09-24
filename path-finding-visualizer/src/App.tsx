import { useState, createContext } from 'react';
import LayoutRoot from './components/LayoutRoot';
import SideNav from './components/SideNav';
import { EditTypes } from './types/edit-types';
import CellGridWrapper from './components/CellGridWrapper';

export const EditStateContext = createContext<EditTypes>('start');

function App() {
  const [editState, setEditState] = useState<EditTypes>('start');
  const [start, setStart] = useState<boolean>(false);

  return (
    <>
      <SideNav
        editState={editState}
        setEditState={setEditState}
        startState={start}
        setStartState={setStart}
      />
      <LayoutRoot>
        <EditStateContext.Provider value={editState}>
          <CellGridWrapper startState={start} />
        </EditStateContext.Provider>
      </LayoutRoot>
    </>
  );
}

export default App;
