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

  items = Array.from({ length: 20 }, (_, i) => `Item #${i}`);

  styles: any = {
    midPanel: {},
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
