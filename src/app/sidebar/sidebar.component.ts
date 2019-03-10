import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  @Output() resizing = new EventEmitter<ResizeEvent>();

  public style: object = {};

  constructor() { }

  ngOnInit() { }

  onResizing(event: ResizeEvent) {
    this.style = {
      width: `${event.rectangle.width}px`
    };

    this.resizing.emit(event);
  }
}
