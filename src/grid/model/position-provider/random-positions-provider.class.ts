import { AGridProvider } from 'grid/model/position-provider/a-grid-provider.abstract';
import { IPositionProvider } from './i-position-provider.interface';
import { GPosition } from 'grid/model/position.type';
import { Injectable } from '@angular/core';
import { Grid } from 'grid/model/grid.class';

@Injectable()
export class RandomPositionsProvider extends AGridProvider {
    private density: number;

    get Title() {
        return 'RandomPosition';
    }

    constructor() {
        super();
        this.density = 1 / 6;
    }

    createGrid(): Grid {
        return new Grid(this.maxX, this.maxY, this.getPositions());
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
