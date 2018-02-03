import { GPosition } from './model/position.type';
import { Component } from '@angular/core';
import { Grid } from 'grid/model/grid.class';
import { RandomPositionsProvider } from 'grid/model/random-positions-provider.class';
import { Subject } from 'rxjs/Subject';

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
    private density = 1 / 6;

    private interv;
    intervalMs = 50;
    grid: Grid;

    constructor(private randomInit: RandomPositionsProvider) {
        this.grid = new Grid(this.x, this.y);
        this.randomInit.initialize(this.x, this.y, this.density);
        this.grid.initialise(this.randomInit.getRandomPositions());

        this.runApp();
    }

    stopApp() {
        clearInterval(this.interv);
    }

    runApp() {
        this.interv = setInterval(() => {
            this.grid.setNextTurn();
        }, this.intervalMs);
    }
}
