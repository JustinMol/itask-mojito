import { Component } from '@angular/core';
import { SidebarResizeEvent } from './sidebar/sidebar.component';
import { MonacoEditorService } from './monaco-editor/monaco-editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(
    private monacoEditorService: MonacoEditorService
  ) { }

  midPanelStyle = {
    left: null,
    right: null
  };

  onSidebarResizing(event: SidebarResizeEvent) {
    if (event.side === 'left') {
      this.midPanelStyle.left = event.rectangle.right + 'px';
    } else {
      this.midPanelStyle.right = event.rectangle.width + 'px';
    }

    this.monacoEditorService.notifyResize();
  }
}
