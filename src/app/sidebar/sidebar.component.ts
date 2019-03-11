import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  @Input() direction: 'left' | 'right';

  @Output() resizing = new EventEmitter<ResizeEvent & { direction: 'left' | 'right' }>();

  style: {
    width?: string,
    left?: string,
    right?: string
  } = {};

  constructor() { }

  ngOnInit() {
    // TODO: move to CSS
    if (this.direction === 'left') {
      this.style.right = '0';
    } else if (this.direction === 'right') {
      this.style.left = '0';
    }
  }

  onResizing(event: ResizeEvent) {
    this.style.width = `${event.rectangle.width}px`;
    this.resizing.emit({ direction: this.direction, ...event });
  }
}
