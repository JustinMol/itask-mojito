import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditorFieldOptions } from '../editor-decorator';
import { EditorService } from '../editor.service';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';

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
  @Input() node: ASTNode;

  @Output('onChange') valueChange$ = new EventEmitter<any>();

  options: SelectOption[] = [];

  constructor(
    private editor: EditorService
  ) {}

  ngOnInit() {
    if (this.field.input === 'select') {
      this.editor.getOptions(this.field, this.node).subscribe(opts => {
        const filter = this.field.filter;
        this.options = filter ? opts.filter(x => filter(x)) : opts;
        console.log(this.value, this.options);
        this.value = this.options.find(opt => opt.equals(this.value));
        console.log(this.value);
      });
    }
  }
  
  onValueChange() {
    this.valueChange$.emit(this.value);
  }
}
