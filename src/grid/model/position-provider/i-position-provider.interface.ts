import { Grid } from './../grid.class';
import { GPosition } from '../position.type';
export interface IPositionProvider {
    RowCount: number;
    ColumnCount: number;
    Title: string;
    createGrid(): Grid;
}
