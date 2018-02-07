import { RandomPositionsProvider } from './../model/position-provider/random-positions-provider.class';
import { GridSandbox } from './../grid.sandbox';
import { GliderProvider } from './../model/position-provider/glider-provider.class';
import { IPositionProvider } from './../model/position-provider/i-position-provider.interface';
import { Component, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-max-interface',
    templateUrl: './max-interface.component.html'
})
export class MaxInterfaceComponent implements AfterViewInit {

    patternProviders: IPositionProvider[] = [
        new RandomPositionsProvider(),
        new GliderProvider()
    ];

    constructor(private gridSb: GridSandbox) {
    }

    ngAfterViewInit(): void {
        this.gridSb.onInitializerSelected(new RandomPositionsProvider());
    }

    selectPattern(pattern) {
        this.gridSb.onInitializerSelected(pattern);
    }
}
