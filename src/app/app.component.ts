import { Component, ViewChild } from '@angular/core';
import { SidebarResizeEvent } from './sidebar/sidebar.component';
import { OutlineComponent } from './outline/outline.component';
import { AdtListComponent } from './adt-list/adt-list.component';
import { FormListComponent } from './form-list/form-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  @ViewChild(OutlineComponent) outline: OutlineComponent;
  @ViewChild(FormListComponent) formList: FormListComponent;
  @ViewChild(AdtListComponent) adtList: AdtListComponent;

  mainPanel: any = {};

  constructor(
    private router: Router
  ) {}

  addTask(event: Event) {
    event.stopImmediatePropagation();
    const task = this.outline.addTask();
    this.router.navigate(['tasks', task.name]);
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
