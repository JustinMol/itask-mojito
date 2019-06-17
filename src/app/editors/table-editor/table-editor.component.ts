import { Component } from '@angular/core';
import { EditorComponent } from '../editor-component';
import { ASTNode } from 'src/app/ast/ast';
import { ASTService } from 'src/app/ast/ast.service';
import { getFields } from './table-editor.decorator';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.less']
})
export class TableEditorComponent extends EditorComponent {

  node: ASTNode;
  fields: { property: string; label: string; value: any }[];

  constructor(
    private ast: ASTService
  ) {
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
