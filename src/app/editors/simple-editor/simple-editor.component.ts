import { Component } from '@angular/core';
import { EditorComponent } from '../editor-component';
import { Field } from '../editor-decorator';
import { ASTService } from 'src/app/ast/ast.service';
import { UserInputDeclaration } from 'src/app/ast/sources/user-input';

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

  onValueChange(field: Field) {
    this.node[field.property] = field.value;
    this.ast.save();
  }
}
