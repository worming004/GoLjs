import { GPosition } from 'grid/model/position.type';
import { Injectable } from '@angular/core';

@Injectable()
export class RandomPositionsProvider {
    private maxX: number;
    private maxY: number;
    private density: number;

    constructor() {
    }

    initialize(numberOfRow: number, numberOfColumn: number, density?: number) {
        this.maxX = numberOfRow - 1;
        this.maxY = numberOfColumn - 1;
        if (!density) {
            density = 1 / 10;
        }
        this.density = density;
        console.log('density: ' + this.density);
    }

    getRandomPositions(): GPosition[] {
        const result: { gpos: GPosition, stringifyGPos: string }[] = [];
        const countOfCellToGenerate = ((this.maxX + 1) * (this.maxY + 1)) * this.density;
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
            Math.floor(Math.random() * this.maxX + 1),
            Math.floor(Math.random() * this.maxY + 1)
        );
    }
}
