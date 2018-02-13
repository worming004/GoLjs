import { Grid } from 'grid/model/grid.class';
import { IPositionProvider } from 'grid/model/position-provider/i-position-provider.interface';

export abstract class AGridProvider implements IPositionProvider {
    protected maxX: number;
    protected maxY: number;

    public get RowCount(): number {
        return this.maxY;
    }
    public set RowCount(v: number) {
        this.maxY = v;
    }

    public get ColumnCount(): number {
        return this.maxX;
    }

    public set ColumnCount(v: number) {
        this.maxX = v;
    }
    Title: string;
    abstract createGrid(): Grid
    constructor() {
        this.maxX = 30;
        this.maxY = 30;
    }
}