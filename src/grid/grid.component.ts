import { GPosition } from './model/position.type';
import { Component } from '@angular/core';
import { Grid } from 'grid/model/grid.class';
import { RandomPositionsProvider } from 'grid/model/random-positions-provider.class';

const initialPositions = [
    [5, 4],
    [5, 5],
    [5, 6]
]

@Component({
    selector: 'app-grid',
    template: `<tr *ngFor="let cellRow of grid.cells">
                    <td *ngFor="let cell of cellRow">
                            <app-cell [cell]="cell"></app-cell>
                    </td>
                </tr>`,
    styles: ['br { display: block; height: 1px;}']
})
export class GridComponent {
    private x = 80;
    private y = 80;
    private density = 1/6;
    intervalMs = 1;
    grid: Grid

    constructor(private randomInit: RandomPositionsProvider) {
        this.grid = new Grid(this.x, this.y);
        this.randomInit.initialize(this.x, this.y, this.density);
        this.grid.initialise(this.randomInit.getRandomPositions());

        setInterval(() => {
            this.grid.setNextTurn();
        }, this.intervalMs)
    }


}

// function doubleArrayToPositions(arr: any[][]): GPosition[] {
//     const result: GPosition[] = [];
//     arr.forEach(position => {
//         result.push(new GPosition(position[0], position[1]));
//     });
//     return result;
// }
