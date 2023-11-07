import { useState, createContext } from 'react';
import LayoutRoot from './components/LayoutRoot';
import SideNav from './components/SideNav';
import { EditTypes } from './types/edit-types';
import CellArrayWrapper from './components/CellArrayWrapper';
import { AppStates } from './types/app-state-types';
import { AlgorithmResultObject, Algorithms } from './types/algorithm-result';

export const EditStateContext = createContext<EditTypes>('start');

function App() {
  const [editState, setEditState] = useState<EditTypes>('start');
  const [appState, setAppState] = useState<AppStates>('draw');
  const [reset, setReset] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [algorithmResults, setAlgorithmResults] = useState<AlgorithmResultObject[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>();

  return (
    <>
      <SideNav
        editState={editState}
        setEditState={setEditState}
        appState={appState}
        setAppState={setAppState}
        setReset={setReset}
        error={error}
        setError={setError}
        algorithmResults={algorithmResults}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      <LayoutRoot>
        <EditStateContext.Provider value={editState}>
          <CellArrayWrapper
            appState={appState}
            setAppState={setAppState}
            reset={reset}
            setReset={setReset}
            setError={setError}
            algorithmResults={algorithmResults}
            setAlgorithmResult={setAlgorithmResults}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
          />
        </EditStateContext.Provider>
      </LayoutRoot>
    </>
  );
}

export default App;
