import { VisualizationCellObject } from './cell-types';

export type Algorithms = 'Breadth First Search' | 'Depth First Search' | 'Best First Search';

export type AlgorithmResultObject = {
  visualizationGrid: VisualizationCellObject[][];
  time: string | null;
  algorithmName: Algorithms;
  key: string;
};
