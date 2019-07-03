import { Component } from '@angular/core';
import { EditorComponent } from '../editor-component';
import { getFields } from '../editor-decorator';
import { ASTService } from 'src/app/ast/ast.service';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';

@Component({
  selector: 'app-simple-editor',
  templateUrl: './simple-editor.component.html',
  styleUrls: ['./simple-editor.component.less']
})
export class SimpleEditorComponent extends EditorComponent {

  node: ASTNode;
  fields: { property: string; label: string; value: any }[];

  constructor(protected ast: ASTService) {
    super();
  }

  ngOnInit(): void {
    this.fields = getFields(this.node);
  }

  onValueChange(field) {
    this.node[field.property] = field.value;
    this.ast.save();
  }
}
