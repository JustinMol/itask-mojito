import { Component } from '@angular/core';
import { SidebarResizeEvent } from '../sidebar/sidebar.component';
import { GraphBlockService } from '../graph/graph-block.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent {

  constructor(
    private graphBlockService: GraphBlockService
  ) {}

  style: any = {};

  onSidebarResize(event: SidebarResizeEvent) {
    const width = event.rectangle.width;
    if (width >= 120) {
      this.style.right = event.rectangle.width + 'px';
    }
  }

}
