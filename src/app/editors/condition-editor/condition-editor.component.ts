import { Component } from '@angular/core';
import { EditorComponent } from '../editor-component';
import { ASTService } from 'src/app/ast/ast.service';
import { DecisionControlDeclaration } from 'src/app/ast/controls/decision';
import { SimpleBooleanExpression } from 'src/app/ast/values/boolean-expression';
import { getFieldOptions } from '../editor-decorator';

@Component({
  selector: 'app-condition-editor',
  templateUrl: './condition-editor.component.html',
  styleUrls: ['./condition-editor.component.less']
})
export class ConditionEditorComponent extends EditorComponent {

  node: DecisionControlDeclaration;

  constructor(private ast: ASTService) {
    super();
  }

  ngOnInit() {
    this.fields = getFieldOptions(new SimpleBooleanExpression());
    this.fields.sort((a, b) => {
      return a.order - b.order;
    });
  }

  onAndClick() {
    this.node.andExpressions.push([new SimpleBooleanExpression()]);
    this.ast.save();
  }

  onOrClick(andExpression: SimpleBooleanExpression[]) {
    andExpression.push(new SimpleBooleanExpression());
    this.ast.save();
  }

  updateExpression(value, expression: SimpleBooleanExpression, prop: string) {
    expression[prop] = value;
  }

}
