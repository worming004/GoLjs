import { GPosition } from 'grid/model/position.type';
import { IPositionProvider } from './i-position-provider.interface';
import { Grid } from 'grid/model/grid.class';
export class GliderProvider implements IPositionProvider {
    private maxX: number;
    private maxY: number;

    constructor() {
        this.maxX = 30;
        this.maxY = 30;
    }

    get Title() {
        return 'Glider';
    }
    getPositions(): GPosition[] {
        return GPosition.Array2DToPosition([
            [4, 2],
            [2, 3],
            [3, 4],
            [4, 3],
            [4, 4],
        ]);
    }
    createGrid(): Grid {
        const g = new Grid(this.maxX, this.maxY, this.getPositions());
        return g;
    }
}
