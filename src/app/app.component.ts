import { Component, ViewChild } from '@angular/core';
import { SidebarResizeEvent } from './sidebar/sidebar.component';
import { OutlineComponent } from './outline/outline.component';
import { AdtListComponent } from './adt-list/adt-list.component';
import { FormListComponent } from './form-list/form-list.component';

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

  addTask(event: Event) {
    this.outline.addTask();
    event.stopImmediatePropagation();
  }

  addForm(event: Event) {
    this.formList.addForm();
    event.stopImmediatePropagation();
  }

  addAdt(event: Event) {
    this.adtList.addAdt();
    event.stopImmediatePropagation();
  }

  onSidebarResize(event: SidebarResizeEvent) {
    const width = event.rectangle.width;
    if (width >= 150) {
      this.mainPanel.left = width + 'px';
    }
  }
}
