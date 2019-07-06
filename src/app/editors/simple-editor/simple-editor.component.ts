import { Component } from '@angular/core';
import { EditorComponent } from '../editor-component';
import { EditorFieldOptions } from '../editor-decorator';
import { ASTService } from 'src/app/ast/ast.service';

@Component({
  selector: 'app-simple-editor',
  templateUrl: './simple-editor.component.html',
  styleUrls: ['./simple-editor.component.less']
})
export class SimpleEditorComponent extends EditorComponent {

  constructor(protected ast: ASTService) {
    super();
  }

  ngOnInit(): void {}

  onValueChange(field: EditorFieldOptions, value: any) {
    this.node[field.property] = value;
    this.ast.save();
  }
}
