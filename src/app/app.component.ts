import { Component } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  midPanel = {
    left: null,
    right: null
  };

  onSidebarResizing(event: ResizeEvent & { direction: string }) {
    if (event.direction === 'left') {
      this.midPanel.right = event.rectangle.width + 'px';
    } else {
      this.midPanel.left = event.rectangle.right + 'px';
    }
  }
}
