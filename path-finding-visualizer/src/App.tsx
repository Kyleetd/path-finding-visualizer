import { useState, createContext } from 'react';
import LayoutRoot from './components/LayoutRoot';
import SideNav from './components/SideNav';
import { EditTypes } from './types/edit-types';
import CellArrayWrapper from './components/CellArrayWrapper';
import { AppStates } from './types/app-state-types';

export const EditStateContext = createContext<EditTypes>('start');

function App() {
  const [editState, setEditState] = useState<EditTypes>('start');
  const [appState, setAppState] = useState<AppStates>('draw');
  const [reset, setReset] = useState<boolean>(false);

  return (
    <>
      <SideNav
        editState={editState}
        setEditState={setEditState}
        appState={appState}
        setAppState={setAppState}
        setReset={setReset}
      />
      <LayoutRoot>
        <EditStateContext.Provider value={editState}>
          <CellArrayWrapper
            appState={appState}
            reset={reset}
            setReset={setReset}
          />
        </EditStateContext.Provider>
      </LayoutRoot>
    </>
  );
}

export default App;
