import { FC } from 'react';
import CellGridDraw from './CellGridDraw';

interface CellGridWrapperProps {
  startState: boolean;
}

const CellGridWrapper: FC<CellGridWrapperProps> = ({ startState }) => {
  return <>{startState ? <></> : <CellGridDraw></CellGridDraw>}</>;
};

export default CellGridWrapper;
