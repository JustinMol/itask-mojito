import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ASTNode } from 'src/app/ast/ast';
import { ASTService } from 'src/app/ast/ast.service';
import { GraphBlockOptions, getGraphBlock } from '../graph-block/graph-block.decorator';

@Component({
  selector: 'app-graph-node-editor',
  templateUrl: './graph-node-editor.component.html',
  styleUrls: ['./graph-node-editor.component.less']
})
export class GraphNodeEditorComponent implements OnInit {

  node: ASTNode;
  block: GraphBlockOptions;

  constructor(
    private route: ActivatedRoute,
    private ast: ASTService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => this.ast.getNode(params.get('node')))
    ).subscribe(node => {
      this.node = node;
      this.block = getGraphBlock(this.node.constructor);
    });
  }

}
