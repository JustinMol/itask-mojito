import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditorFieldOptions } from '../editor-decorator';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.less']
})
export class FieldInputComponent implements OnInit {

  @Input() field: EditorFieldOptions;
  @Input() value: any;

  @Output('onChange') valueChange$ = new EventEmitter<any>();

  options: any[] = [];

  constructor(private editor: EditorService) {}

  ngOnInit() {
    if (this.field.input === 'select') {
      this.editor.getOptions(this.field.type).subscribe(opts => {
        this.options = opts;
      });
    }
  }
  
  onValueChange() {
    this.valueChange$.emit(this.value);
  }
}
