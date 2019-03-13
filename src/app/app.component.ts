import { Component } from '@angular/core';
import { SidebarResizeEvent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

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
  }
}
