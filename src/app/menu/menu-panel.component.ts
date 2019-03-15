import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, HostListener } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.less']
})
export class MenuPanelComponent {
  @Input() title: string;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.open')
  isOpen: boolean = true;

  @ViewChild(NgScrollbar)
  bodyScrollbar?: NgScrollbar;

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
