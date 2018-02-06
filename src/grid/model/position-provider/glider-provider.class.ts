import { GPosition } from '../position.type';
import { IPositionProvider } from './i-position-provider.interface';
export class GliderProvider implements IPositionProvider {
    get Title() {
        return 'Glider';
    }
    initialize(numberOfRow: number, numberOfColumn: number, density?: number) { }
    getPositions(): GPosition[] {
        return [
            new GPosition(4, 2),
            new GPosition(2, 3),
            new GPosition(3, 4),
            new GPosition(4, 3),
            new GPosition(4, 4)
        ];
    }
}
