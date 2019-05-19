import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TaskComponent } from './task/task.component';
import { GraphNodeEditorComponent } from './graph/graph-node-editor/graph-node-editor.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'tasks/:task',
    component: TaskComponent,
    children: [{
      path: 'nodes/:node',
      component: GraphNodeEditorComponent,
    }]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
