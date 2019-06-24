import { Component, Input, EventEmitter, Output } from '@angular/core';
import { EditorComponent } from '../editor-component';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.less']
})
export class TableEditorComponent extends EditorComponent {

  @Input() rows: any[];
  @Input() columns: string[];
  @Input() addText: string = 'Add Field';

  @Output() add: EventEmitter<void> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {}

  get showDeleteButtons() {
    return this.rows.length > 1;
  }

  onAdd() {
    this.add.next();
  }

  onValueChange(row) {
    this.change.next(row);
  }

  onDelete(row) {
    this.delete.next(row);
  }

}
