import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphFrameComponent } from './graph/graph-frame/graph-frame.component';

const routes: Routes = [
  { path: '', component: GraphFrameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
