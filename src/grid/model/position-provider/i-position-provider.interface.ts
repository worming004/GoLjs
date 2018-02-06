import { GPosition } from '../position.type';
export interface IPositionProvider {
    Title: string;
    initialize(numberOfRow: number, numberOfColumn: number, density?: number);
    getPositions(): GPosition[];
}
