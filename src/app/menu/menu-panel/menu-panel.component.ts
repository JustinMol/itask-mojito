import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.less']
})
export class MenuPanelComponent implements OnInit {
  @Input() panelTitle: string;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() add: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.open')
  isOpen: boolean = true;

  showAddButton: boolean;

  ngOnInit() {
    this.showAddButton = this.add.observers.length > 0;
  }
}
