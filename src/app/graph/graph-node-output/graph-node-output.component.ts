import { Component, OnInit, Input } from '@angular/core';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';

@Component({
  selector: '[graph-node-output]',
  templateUrl: './graph-node-output.component.html',
  styleUrls: ['./graph-node-output.component.less']
})
export class GraphNodeOutputComponent implements OnInit {

  @Input() node: ASTNode;

  output: any;

  constructor() { }

  ngOnInit() {
    this.output = this.node.getOutput();
  }

}
