import { Component, ViewChild } from '@angular/core';
import { SidebarResizeEvent } from './sidebar/sidebar.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { AdtListComponent } from './adt-list/adt-list.component';
import { FormListComponent } from './form-list/form-list.component';
import { Router } from '@angular/router';
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  @ViewChild(TaskListComponent) taskList: TaskListComponent;
  @ViewChild(FormListComponent) formList: FormListComponent;
  @ViewChild(AdtListComponent) adtList: AdtListComponent;

  mainPanel: any = {};

  constructor(
    private router: Router,
    private taskService: TaskService
  ) {}

  addTask(event: Event) {
    event.stopImmediatePropagation();
    const task = this.taskService.newTask();
    this.router.navigate(['/tasks', task.id]);
  }

  addForm(event: Event) {
    event.stopImmediatePropagation();
    this.formList.addForm();
  }

  addAdt(event: Event) {
    event.stopImmediatePropagation();
    this.adtList.addAdt();
  }

  onSidebarResize(event: SidebarResizeEvent) {
    const width = event.rectangle.width;
    if (width >= 150) {
      this.mainPanel.left = width + 'px';
    }
  }
}
