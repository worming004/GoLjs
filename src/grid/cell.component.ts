import { Cell } from './model/cell.class';
import { Component, Input } from '@angular/core/src/metadata/directives';

@Component({
    selector: 'app-cell',
    template: `<div style="float: left" [ngClass]="{isAlive: cell.isAlive, isDead: !cell.isAlive}" class="cell"></div>`,
    styles: ['.isAlive {background-color: black;}',
        '.isDead {background-color: white;}',
        '.cell {margin-left: 2px; margin-bottom: 2px; width: 8px; height: 8px;}'
    ]
})
export class CellComponent {
    @Input() cell: Cell

    static count: number = 0;
    counted: number;

    constructor() { CellComponent.count++; this.counted = CellComponent.count; }
}