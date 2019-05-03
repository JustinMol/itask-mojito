import { Component, ViewChild } from '@angular/core';
import { SidebarResizeEvent } from './sidebar/sidebar.component';
import { MonacoEditorService } from './monaco-editor/monaco-editor.service';
import { GraphBlockService } from './graph/graph-block.service';
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

  constructor(
    private monacoEditorService: MonacoEditorService,
    private graphBlockService: GraphBlockService
  ) {}

  styles: any = {
    midPanel: {},
  }

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

  onSidebarResizing(event: SidebarResizeEvent) {
    if (event.side === 'left') {
      this.styles.midPanel.left = event.rectangle.right + 'px';
    } else {
      this.styles.midPanel.right = event.rectangle.width + 'px';
    }

    this.monacoEditorService.notifyResize();
  }
}
