import { Component } from '@angular/core';
import { Grid } from 'grid/model/grid.class';

const initialPositions = [
    {x: 5, y:4 },
    {x: 5, y:5 },
    {x: 5, y:6 }
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
    speedMs: number = 2000;
    grid: Grid

    constructor() {
        this.grid = new Grid(50, 50);
        this.grid.initialise(initialPositions);

        setInterval(() => {
            this.grid.setNextTurn();
        }, this.speedMs)
    }


}