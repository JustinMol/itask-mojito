import { Component, Input, EventEmitter, Output } from '@angular/core';
import { EditorComponent } from '../editor-component';
import { EditorFieldOptions } from '../editor-decorator';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.less']
})
export class TableEditorComponent extends EditorComponent {

  @Input() rows: any[];
  @Input() columns: EditorFieldOptions[];
  @Input() addText: string = 'Add Field';

  @Output() add: EventEmitter<void> = new EventEmitter();
  @Output('onChange') change: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  get showDeleteButtons() {
    return this.rows.length > 1;
  }

  onAdd() {
    this.add.next();
  }

  onValueChange(row: any, column: EditorFieldOptions, value: any) {
    row[column.property] = value;
    this.change.next(row);
  }

  onDelete(row) {
    this.delete.next(row);
  }

}
