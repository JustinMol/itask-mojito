import { Component } from '@angular/core';
import { SidebarResizeEvent } from './sidebar/sidebar.component';
import { Router } from '@angular/router';
import { TaskService } from './task/task.service';
import { Observable } from 'rxjs';
import { TaskDeclaration, RecordTypeDeclaration, OptionTypeDeclaration } from './ast/ast';
import { RecordTypeService } from './record-type.service';
import { OptionTypeService } from './option-type.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  mainPanel: any = {};

  tasks$: Observable<TaskDeclaration[]>;
  recordTypes$: Observable<RecordTypeDeclaration[]>;
  optionTypes$: Observable<OptionTypeDeclaration[]>;

  constructor(
    private router: Router,
    private tasks: TaskService,
    private recordTypes: RecordTypeService,
    private optionTypes: OptionTypeService
  ) {
    this.recordTypes$ = recordTypes.getAll();
    this.tasks$ = tasks.getAll();
    this.optionTypes$ = optionTypes.getAll();
  }

  addTask(event: Event) {
    event.stopImmediatePropagation();
    this.tasks.newTask().subscribe(m => this.navigateTo(m));
  }

  addForm(event: Event) {
    event.stopImmediatePropagation();
    this.recordTypes.create().subscribe(m => this.navigateTo(m));
  }

  addAdt(event: Event) {
    event.stopImmediatePropagation();
    this.optionTypes.create().subscribe(m => this.navigateTo(m));
  }

  navigateTo(model: TaskDeclaration | RecordTypeDeclaration | OptionTypeDeclaration) {
    const path: string = model instanceof TaskDeclaration ? '/tasks' :
      model instanceof RecordTypeDeclaration ? '/records' : '/options';
    return this.router.navigate([path, model.id]);
  }

  onSidebarResize(event: SidebarResizeEvent) {
    const width = event.rectangle.width;
    if (width >= 150) {
      this.mainPanel.left = width + 'px';
    }
  }
}
