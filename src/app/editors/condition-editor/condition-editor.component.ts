import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '../editor-component';
import { DecisionControlDeclaration, SimpleBooleanExpression } from 'src/app/ast/ast';

@Component({
  selector: 'app-condition-editor',
  templateUrl: './condition-editor.component.html',
  styleUrls: ['./condition-editor.component.less']
})
export class ConditionEditorComponent extends EditorComponent {

  node: DecisionControlDeclaration;

  constructor() {
    super();
  }

  ngOnInit() {}

  onAndClick() {
    this.node.andExpressions.push([new SimpleBooleanExpression()]);
  }

  onOrClick(andExpression: SimpleBooleanExpression[]) {
    andExpression.push(new SimpleBooleanExpression());
  }

}
