import { Component } from '@angular/core';
import { Grid } from 'grid/model/grid.class';

const initialPositions = [
    [5,4],
    [5,5],
    [5,6]
]

function doubleArrayToPositions(arr: any[][]) {
    const result: { x: number, y: number }[] = [];
    arr.forEach(position => {
        result.push({x: position[0], y: position[1]});
    });
    return result;
}

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
    speedMs: number = 500;
    grid: Grid

    constructor() {
        this.grid = new Grid(50, 50);
        this.grid.initialise(doubleArrayToPositions(initialPositions));

        setInterval(() => {
            this.grid.setNextTurn();
        }, this.speedMs)
    }


}