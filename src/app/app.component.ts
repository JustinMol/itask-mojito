import { Component } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  onSidebarResizing(event: ResizeEvent) {
    console.log('Resized sidebar', event.edges);
  }
}
