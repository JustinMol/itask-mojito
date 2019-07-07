import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditorFieldOptions } from '../editor-decorator';
import { EditorService } from '../editor.service';

export interface SelectOption {
  name: string;
  equals(other: SelectOption): boolean;
}

@Component({
  selector: 'app-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.less']
})
export class FieldInputComponent implements OnInit {

  @Input() field: EditorFieldOptions;
  @Input() value: SelectOption;

  @Output('onChange') valueChange$ = new EventEmitter<any>();

  options: SelectOption[] = [];

  constructor(private editor: EditorService) {}

  ngOnInit() {
    if (this.field.input === 'select') {
      this.editor.getOptions(this.field.type).subscribe(opts => {
        this.options = opts;
        this.value = this.options.find(opt => opt.equals(this.value));
      });
    }
  }
  
  onValueChange() {
    this.valueChange$.emit(this.value);
  }
}
