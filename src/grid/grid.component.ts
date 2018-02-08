import { GridSandbox } from './grid.sandbox';
import { IPositionProvider } from './model/position-provider/i-position-provider.interface';
import { GPosition } from './model/position.type';
import { Component, Input, AfterViewInit } from '@angular/core';
import { Grid } from 'grid/model/grid.class';
import { RandomPositionsProvider } from 'grid/model/position-provider/random-positions-provider.class';
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
    private intervalMs = 50;

    private interv;
    grid: Grid;

    constructor(private gridSb: GridSandbox) {
        gridSb.selectedInitializer$.subscribe((prov) => {
            this.init(prov);
            this.runApp();
        });
    }

    ngAfterViewInit(): void {
    }

    init(initializer: IPositionProvider) {
        if (initializer) {
            this.grid = initializer.createGrid();
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
