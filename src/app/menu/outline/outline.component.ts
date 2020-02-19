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
  @Output('onRename') onRename$: EventEmitter<MenuItem> = new EventEmitter();

  items: MenuItem[];

  ngOnInit() {
    this.items$.subscribe(items => this.items = this.sort(items));
  }

  onRename(event: Event, item: MenuItem) {
    event.stopImmediatePropagation();
    this.onRename$.emit(item);
  }

  private sort(items: MenuItem[]): MenuItem[] {
    return items.sort((a, b) => {
      const x = a.name;
      const y = b.name;

      if (x > y) {
        return 1;
      }

      if (y > x) {
        return -1;
      }

      return 0;
    });
  }

}
