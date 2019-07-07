import { Component, OnInit, Input } from '@angular/core';
import { DropTargetMonitor } from '@angular-skyhook/core';
import { GraphBlockOptions } from '../graph-block/graph-block.decorator';
import { GraphService } from '../graph.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';
import { Coordinates } from 'src/app/ast/ast-node/coordinates';
import { SequenceEdge } from 'src/app/ast/edge/sequence-edge';
import { Edge } from 'src/app/ast/edge/edge';
import { OptionDeclaration } from 'src/app/ast/data-type/option-type';
import { OptionEdge } from 'src/app/ast/edge/option-edge';
import { TaskOutput } from 'src/app/ast/task/task-output';
import { TaskInput } from 'src/app/ast/task/task-input';
import { Subject } from 'rxjs';

declare const SVG: any;

const GRID_SIZE_LARGE = 100;
const GRID_SIZE_SMALL = 25;

@Component({
  selector: 'app-graph-frame',
  templateUrl: './graph-frame.component.html',
  styleUrls: ['./graph-frame.component.less'],
  providers: [GraphService]
})
export class GraphFrameComponent implements OnInit {

  @Input() input: TaskInput;
  @Input() output: TaskOutput;
  @Input() nodes: ASTNode[] = [];
  @Input() edges: Edge[] = [];

  public resized$ = new Subject();

  private svg;

  newEdge: Edge;
  newEdgeFrom: ASTNode;
  newEdgeOption: boolean | OptionDeclaration;

  constructor(
    private graph: GraphService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges(): void {
    this.resized$.next();
  }

  ngOnInit() {
    this.svg = SVG('#graph-frame');
    this.drawGrid(GRID_SIZE_LARGE, 0.2);
    this.drawGrid(GRID_SIZE_SMALL, 0.1);

    this.resized$.subscribe(() => {
      const rbox = this.svg.rbox();
      this.output.setCoordinates(new Coordinates(rbox.width / 2 + 20, 30 + 20));
    });
    this.resized$.next();
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
    const node = this.graph.createNode(block, coordinates);
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

  onRightClick(event: Event, node?: ASTNode) {
    event.stopImmediatePropagation();
    if (node) {
      this.graph.deleteNode(node);
    }

    return false;
  }

  onRightClickEdge(event: Event, edge: Edge) {
    event.stopImmediatePropagation();
    this.graph.deleteEdge(edge);
    return false;
  }

  private editNode(node: ASTNode) {
    return this.router.navigate(
      ['./nodes', node.id],
      { relativeTo: this.route }
    );
  }

  startEdge(node: ASTNode, option: boolean | OptionDeclaration) {
    this.newEdgeFrom = node;
    this.newEdgeOption = option;
  }

  private completeEdge(to: ASTNode) {
    if (this.canReceiveEdge(to)) {
      this.graph.createEdge(this.newEdgeFrom, to, this.newEdgeOption);
      this.newEdgeFrom = null;
      this.newEdge = null;
      this.newEdgeOption = null;
    }
  }

  onNodeHover(node: ASTNode) {
    if (!this.newEdgeFrom) return;
    if (this.newEdge && this.newEdge.from === node) return;
    if (!this.canReceiveEdge(node)) return;

    if (this.newEdgeOption != null) {
      this.newEdge = new OptionEdge(this.newEdgeFrom, node, this.newEdgeOption);
    } else {
      this.newEdge = new SequenceEdge(this.newEdgeFrom, node);
    }
  }

  onNodeLeave(node: ASTNode) {
    this.newEdge = null;
  }

}
