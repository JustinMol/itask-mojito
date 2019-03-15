import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.less']
})
export class MenuPanelComponent {
  @Input() title: string;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  isOpen: boolean = true;
}
