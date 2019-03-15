import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { state, trigger, transition } from '@angular/animations';

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
}
