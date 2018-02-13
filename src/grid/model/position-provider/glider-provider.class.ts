import { GPosition } from 'grid/model/position.type';
import { IPositionProvider } from './i-position-provider.interface';
import { Grid } from 'grid/model/grid.class';
import { AGridProvider } from 'grid/model/position-provider/a-grid-provider.abstract';
export class GliderProvider extends AGridProvider {
    constructor() {
        super();
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
        return new Grid(this.maxX, this.maxY, this.getPositions());
    }
}
