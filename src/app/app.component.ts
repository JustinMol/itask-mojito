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

  styles: {
    midPanel: { left?: string, right?: string },
    sidebars: {
      left: { width?: string },
      right: { width?: string }
    }
  } = {
    midPanel: {},
    sidebars: {
      left: {},
      right: {},
    }
  }

  onSidebarResizing(event: SidebarResizeEvent) {
    this.styles.sidebars[event.side].width = event.rectangle.width + 'px';
    if (event.side === 'left') {
      this.styles.midPanel.left = event.rectangle.right + 'px';
    } else {
      this.styles.midPanel.right = event.rectangle.width + 'px';
    }

    this.monacoEditorService.notifyResize();
  }
}
