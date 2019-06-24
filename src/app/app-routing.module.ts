import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TaskComponent } from './task/task.component';
import { GraphNodeEditorComponent } from './editors/graph-node-editor/graph-node-editor.component';
import { RecordTypeEditorComponent } from './editors/record-type-editor/record-type-editor.component';
import { OptionTypeEditorComponent } from './editors/option-type-editor/option-type-editor.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'tasks/:task',
    component: TaskComponent,
    children: [{
      path: 'nodes/:node',
      component: GraphNodeEditorComponent,
    }]
  },
  { path: 'records/:id', component: RecordTypeEditorComponent },
  { path: 'options/:id', component: OptionTypeEditorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
