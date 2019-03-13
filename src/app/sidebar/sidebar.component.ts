import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

export type SidebarResizeEvent = ResizeEvent & { side: 'left' | 'right' };

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  @Input() side: 'left' | 'right';

  @Output() resizing = new EventEmitter<SidebarResizeEvent>();

  style: {
    width?: string,
    left?: string,
    right?: string
  } = {};

  constructor() { }

  ngOnInit() {
    this.style[this.side] = '0';
  }

  onResizing(event: ResizeEvent) {
    this.style.width = `${event.rectangle.width}px`;
    this.resizing.emit({ side: this.side, ...event });
  }
}
