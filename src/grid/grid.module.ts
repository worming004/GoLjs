import { CellComponent } from './cell.component';
import { GridComponent } from './grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeToArrayPipe } from 'grid/range-to-array.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [GridComponent, CellComponent],
  declarations: [
    RangeToArrayPipe, GridComponent, CellComponent
  ]
})
export class GridModule { }
