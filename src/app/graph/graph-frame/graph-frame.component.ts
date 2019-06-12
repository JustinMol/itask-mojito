import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DropTargetMonitor } from '@angular-skyhook/core';
import { GraphBlockOptions } from '../graph-block/graph-block.decorator';
import { ASTNode, Coordinates } from 'src/app/ast/ast';
import { GraphService } from '../graph.service';
import { ActivatedRoute, Router } from '@angular/router';

declare const SVG: any;

const GRID_SIZE = 100;

@Component({
  selector: 'app-graph-frame',
  templateUrl: './graph-frame.component.html',
  styleUrls: ['./graph-frame.component.less'],
  providers: [GraphService]
})
export class GraphFrameComponent implements OnInit {

  @Input() nodes: ASTNode[] = []

  private svg;

  constructor(
    private graph: GraphService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.svg = SVG('#graph-frame');
    this.drawGrid(GRID_SIZE, 0.2);
    this.drawGrid(10, 0.1);
  }

  drawGrid(gridSize, strokeWidth) {
    const grid = this.svg.defs().pattern(gridSize, gridSize, add => {
      add.line(0, 0, 0, gridSize)
        .stroke({ width: strokeWidth, color: '#a9b4af' });
      add.line(0, 0, gridSize, 0)
        .stroke({ width: strokeWidth, color: '#a9b4af' });
    });

    this.svg.rect().back().attr({
      width: '100%',
      height: '100%',
      fill: grid,
    });
  }

  onDrop(m: DropTargetMonitor<GraphBlockOptions>) {
    const offset = m.getClientOffset();
    const bounds = this.svg.node.getBoundingClientRect();
    const x = offset.x - bounds.left;
    const y = offset.y - bounds.top;
    const block: GraphBlockOptions = m.getItem();
    this.graph.createNode(block, { x, y });
  }

  onNodeMove(node: ASTNode, coordinates: Coordinates) {
    this.graph.moveNode(node, coordinates);
  }

  onNodeClick(node: ASTNode) {
    this.router.navigate(
      ['./nodes', node.id],
      { relativeTo: this.route }
    );
  }

}
