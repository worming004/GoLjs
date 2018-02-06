import { Grid } from './../grid.class';
import { GPosition } from '../position.type';
export interface IPositionProvider {
    Title: string;
    createGrid(): Grid;
}
