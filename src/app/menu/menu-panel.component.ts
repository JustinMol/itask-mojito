import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, HostListener, OnInit } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.less']
})
export class MenuPanelComponent implements OnInit {
  @Input() title: string;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() add: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.open')
  isOpen: boolean = true;

  @ViewChild(NgScrollbar)
  bodyScrollbar?: NgScrollbar;

  showAddButton: boolean;

  ngOnInit() {
    this.showAddButton = this.add.observers.length > 0;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateScrollbar();
  }

  updateScrollbar() {
    if (this.bodyScrollbar) {
      this.bodyScrollbar.update();
    }
  }
}
