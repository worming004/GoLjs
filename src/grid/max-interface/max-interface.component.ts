import { GliderProvider } from './../model/glider-provider.class';
import { IPositionProvider } from './../model/i-position-provider.interface';
import { Component, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { RandomPositionsProvider } from 'grid/model/random-positions-provider.class';

@Component({
    selector: 'app-max-interface',
    templateUrl: './max-interface.component.html'
})
export class MaxInterfaceComponent implements AfterViewInit {

    patternProviders: IPositionProvider[] = [
        new RandomPositionsProvider(),
        new GliderProvider()
    ];

    gridInitializer$ = new Subject();

    ngAfterViewInit(): void {
        this.gridInitializer$.next(new RandomPositionsProvider());
    }

    selectPattern(pattern) {
        this.gridInitializer$.next(pattern);
    }


}
