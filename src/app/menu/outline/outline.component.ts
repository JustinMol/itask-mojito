import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

declare type MenuItem = any;

@Component({
  selector: 'app-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.less']
})
export class OutlineComponent implements OnInit {

  @Input('items') items$: Observable<MenuItem>;
  @Output() onSelect: EventEmitter<MenuItem> = new EventEmitter();
  @Output() onDelete: EventEmitter<MenuItem> = new EventEmitter();

  items: MenuItem[];

  ngOnInit() {
    this.items$.subscribe(items => this.items = items);
  }

}
