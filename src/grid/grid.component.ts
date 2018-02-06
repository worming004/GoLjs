import { GPosition } from './model/position.type';
import { Component, Input, AfterViewInit } from '@angular/core';
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
    template: `<div *ngIf="grid">
                    <tr *ngFor="let cellRow of grid.cells">
                        <td *ngFor="let cell of cellRow">
                                <app-cell [cell]="cell"></app-cell>
                        </td>
                    </tr>
                </div>`,
    styles: ['br { display: block; height: 1px;}']
})
export class GridComponent implements AfterViewInit {
    private x = 80;
    private y = 80;
    private density = 1 / 6;
    private intervalMs = 50;

    @Input() gridInitializer;

    private interv;
    grid: Grid;

    ngAfterViewInit(): void {
        if (this.gridInitializer) {
            this.gridInitializer.subscribe(initializer => {
                this.init(initializer);
            });

            this.runApp();
        }
    }

    init(initializer: any) {
        for (const prop in initializer) {
            if (initializer.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
                this[prop] = initializer[prop];
            }
        }

        this.grid = new Grid(this.x, this.y);
        if (initializer) {
            initializer.initialize(this.x, this.y, this.density);
            this.grid.initialise(initializer.getPositions());
        }
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
