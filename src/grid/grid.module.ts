import { RandomPositionsProvider } from './model/random-positions-provider.class';
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
  providers: [RandomPositionsProvider]
})
export class GridModule { }
