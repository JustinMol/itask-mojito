import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ASTNode } from 'src/app/ast/ast';
import { ASTService } from 'src/app/ast/ast.service';
import { getGraphBlock, GraphBlockOptions } from 'src/app/graph/graph-block/graph-block.decorator';

@Component({
  selector: 'app-graph-node-editor',
  templateUrl: './graph-node-editor.component.html',
  styleUrls: ['./graph-node-editor.component.less']
})
export class GraphNodeEditorComponent implements OnInit {

  block: GraphBlockOptions;
  node: ASTNode;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ast: ASTService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => this.ast.getNode(params.get('node')))
    ).subscribe(node => {
      this.block = getGraphBlock(node.constructor);
      this.node = node;
    });
  }

  onConfirm() {
    // Navigate back to task
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
