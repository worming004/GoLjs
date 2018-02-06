import { GliderProvider } from './model/position-provider/glider-provider.class';
import { RandomPositionsProvider } from './model/position-provider/random-positions-provider.class';
import { MaxInterfaceComponent } from 'grid/max-interface/max-interface.component';
import { CellComponent } from './cell.component';
import { GridComponent } from './grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeToArrayPipe } from 'grid/range-to-array.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [MaxInterfaceComponent],
  declarations: [
    RangeToArrayPipe, GridComponent, CellComponent, MaxInterfaceComponent
  ],
  providers: [RandomPositionsProvider, GliderProvider]
})
export class GridModule { }
