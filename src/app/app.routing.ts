import { GridModule } from 'grid/grid.module';
import { GridComponent } from './../grid/grid.component';
import { Routes, RouterModule } from '@Angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'grid', component: GridComponent },
    { path: '**', redirectTo: '/grid', pathMatch: 'full' }
];

@NgModule({
    imports: [
        GridModule,
        RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }