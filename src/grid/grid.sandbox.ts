import { IPositionProvider } from './model/position-provider/i-position-provider.interface';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class GridSandbox {
    selectedInitializer$ = new Subject<IPositionProvider>();

    onInitializerSelected(prov: IPositionProvider) {
        this.selectedInitializer$.next(prov);
    }
}