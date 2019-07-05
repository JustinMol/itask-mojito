import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';
import { DecisionControlDeclaration } from 'src/app/ast/controls/decision';

declare const SVG: any;

export interface EdgeButton {
  text: string;
}

@Component({
  selector: '[graph-node-button]',
  templateUrl: './graph-node-button.component.html',
  styleUrls: ['./graph-node-button.component.less']
})
export class GraphNodeButtonComponent implements OnInit {

  @Input() node: ASTNode;
  @Input() options: any[];
  @Output('buttonClick') buttonClick$: EventEmitter<any> = new EventEmitter();

  // private svg: any;
  // private block: GraphBlockOptions;

  constructor(
    private el: ElementRef<SVGElement>
  ) {}

  ngOnInit() {
    if (this.node instanceof DecisionControlDeclaration) {
      this.options = ['true', 'false'];
    } else {
      this.options = [];
    }
    // this.block = getGraphBlock(this.node.constructor);
    // this.svg = SVG.adopt(this.el.nativeElement);
  }

  onButtonClick(e) {
    this.buttonClick$.next(e);
  }

}
