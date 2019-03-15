import { Component, Output, EventEmitter, Input, OnInit, HostBinding } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

export type SidebarResizeEvent = ResizeEvent & { side: 'left' | 'right' };

enum Edge {
  left = 'left',
  right = 'right'
}

namespace Edge {
  export function invert(dir: Edge) {
    return dir === 'left' ? 'right' : 'left';
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  @Input() side: Edge;
  
  @Output() resizing = new EventEmitter<SidebarResizeEvent>();

  @HostBinding('style.width')
  currentWidth: string;

  resizeEdges: any;

  ngOnInit() {
    this.resizeEdges = {
      [Edge.invert(this.side)]: true
    };
  }

  onResizing(event: ResizeEvent) {
    this.currentWidth = event.rectangle.width + 'px';
    this.resizing.emit({ side: this.side, ...event });
  }

  onResized(event: ResizeEvent) {
    this.resizing.emit({ side: this.side, ...event });
  }
}
