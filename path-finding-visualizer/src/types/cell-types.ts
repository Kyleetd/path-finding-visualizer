type Start = 'start';
type End = 'end';
type Wall = 'wall';
type Empty = 'empty';
export type DrawingCellTypes = Start | End | Wall | Empty;

type Searched = 'searched';
type OpenSet = 'openset';
type Path = 'path';
export type VisualizationCellTypes = DrawingCellTypes | Searched | OpenSet | Path;

export type VisualizationCellObject = {
  visualizationCellType: VisualizationCellTypes;
  key: string;
};
