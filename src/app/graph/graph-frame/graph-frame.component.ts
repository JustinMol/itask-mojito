import { Component, OnInit, Input } from '@angular/core';
import { DropTargetMonitor } from '@angular-skyhook/core';
import { GraphBlockOptions } from '../graph-block/graph-block.decorator';
import { ASTNode, Coordinates, SequenceEdge } from 'src/app/ast/ast';
import { GraphService } from '../graph.service';
import { ActivatedRoute, Router } from '@angular/router';

declare const SVG: any;

const GRID_SIZE_LARGE = 100;
const GRID_SIZE_SMALL = 50;

@Component({
  selector: 'app-graph-frame',
  templateUrl: './graph-frame.component.html',
  styleUrls: ['./graph-frame.component.less'],
  providers: [GraphService]
})
export class GraphFrameComponent implements OnInit {

  @Input() nodes: ASTNode[] = [];
  @Input() edges: SequenceEdge[] = [];

  private svg;

  newEdgeFrom: ASTNode;
  newEdge: SequenceEdge;

  constructor(
    private graph: GraphService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.svg = SVG('#graph-frame');
    this.drawGrid(GRID_SIZE_LARGE, 0.2);
    this.drawGrid(GRID_SIZE_SMALL, 0.1);
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

  onFrameClick() {
    this.newEdge = null;
    this.newEdgeFrom = null;
  }

  canSendEdge(node: ASTNode) {
    return this.graph.canSendEdge(node);
  }

  canReceiveEdge(node: ASTNode): boolean {
    return this.graph.canCreateEdge(this.newEdgeFrom, node);
  }

  onDrop(m: DropTargetMonitor<GraphBlockOptions>) {
    const offset = m.getClientOffset();
    const bounds = this.svg.node.getBoundingClientRect();
    const x = offset.x - bounds.left;
    const y = offset.y - bounds.top;
    const block: GraphBlockOptions = m.getItem();
    const coordinates = new Coordinates(x, y).snap(GRID_SIZE_SMALL);
    this.graph.createNode(block, coordinates);
  }

  onNodeMove(node: ASTNode, coordinates: Coordinates) {
    this.graph.moveNode(node, coordinates.snap(GRID_SIZE_SMALL));
  }

  onNodeClick(node: ASTNode) {
    if (this.newEdgeFrom) {
      this.completeEdge(node);
    } else {
      this.editNode(node);
    }
  }

  private editNode(node: ASTNode) {
    return this.router.navigate(
      ['./nodes', node.id],
      { relativeTo: this.route }
    );
  }

  startEdge(node: ASTNode, event: Event) {
    event.stopImmediatePropagation();
    this.newEdgeFrom = node;
  }

  private completeEdge(to: ASTNode) {
    if (this.canReceiveEdge(to)) {
      this.graph.createEdge(this.newEdgeFrom, to);
      this.newEdgeFrom = null;
    }
  }

  onNodeHover(node: ASTNode) {
    if (!this.newEdgeFrom) return;
    if (this.newEdge && this.newEdge.from === node) return;
    if (!this.canReceiveEdge(node)) return;

    this.newEdge = new SequenceEdge(this.newEdgeFrom, node);
  }

  onNodeLeave(node: ASTNode) {
    this.newEdge = null;
  }

}
