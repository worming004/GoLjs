import { GPosition } from '../position.type';
import { IPositionProvider } from './i-position-provider.interface';
import { Grid } from 'grid/model/grid.class';
export class GliderProvider implements IPositionProvider {
    private maxX: number;
    private maxY: number;

    constructor() {
        this.maxX = 50;
        this.maxY = 50;
    }

    get Title() {
        return 'Glider';
    }
    getPositions(): GPosition[] {
        return [
            new GPosition(4, 2),
            new GPosition(2, 3),
            new GPosition(3, 4),
            new GPosition(4, 3),
            new GPosition(4, 4)
        ];
    }
    createGrid(): Grid {
        const g = new Grid(this.maxX, this.maxY, this.getPositions());
        return g;
    }
}
