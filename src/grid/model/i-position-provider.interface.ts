import { GPosition } from './position.type';
export interface IPositionProvider {
    initialize(numberOfRow: number, numberOfColumn: number, density?: number);
    getPositions(): GPosition[];
}
