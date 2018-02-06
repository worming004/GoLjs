import { IPositionProvider } from './i-position-provider.interface';
import { GPosition } from 'grid/model/position.type';
import { Injectable } from '@angular/core';
import { Grid } from 'grid/model/grid.class';

@Injectable()
export class RandomPositionsProvider implements IPositionProvider {
    private maxX: number;
    private maxY: number;
    private density: number;

    get Title() {
        return 'RandomPosition';
    }

    constructor() {
        this.maxX = 80;
        this.maxY = 80;
        this.density = 1 / 6;
    }

    createGrid(): Grid {
        const g = new Grid(this.maxX, this.maxY, this.getPositions());
        return g;
    }

    getPositions(): GPosition[] {
        const result: { gpos: GPosition, stringifyGPos: string }[] = [];
        const countOfCellToGenerate = this.maxX * this.maxY * this.density;
        console.log('count to generate: ' + countOfCellToGenerate);
        for (let i = 0; i < countOfCellToGenerate; i++) {
            let newPosition = this.getARandomPositionWithStringify();
            while (result.filter((pos) =>
                pos.stringifyGPos === newPosition.stringifyGPos
            ).length > 0) {
                newPosition = this.getARandomPositionWithStringify();
            }
            result.push(newPosition);
        }
        return result.map(arr => arr.gpos);
    }

    getARandomPositionWithStringify() {
        const pos = this.getARandomPosition();
        return { gpos: pos, stringifyGPos: JSON.stringify(pos) };
    }

    getARandomPosition(): GPosition {
        return new GPosition(
            Math.floor(Math.random() * this.maxX),
            Math.floor(Math.random() * this.maxY)
        );
    }
}
