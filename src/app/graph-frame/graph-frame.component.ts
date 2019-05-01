import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkyhookDndService, DropTargetMonitor } from '@angular-skyhook/core';
import { GraphBlock, GraphBlockType } from '../graph-block';
import { GraphService } from '../graph.service';
import { GraphNode, GraphNodeType } from '../graph-node';

@Component({
  selector: 'app-graph-frame',
  templateUrl: './graph-frame.component.html',
  styleUrls: ['./graph-frame.component.less']
})
export class GraphFrameComponent implements OnDestroy, OnInit {

  nodes: GraphNode[] = [];

  dropTarget = this.dnd.dropTarget<GraphBlock | GraphNode>([GraphBlockType, GraphNodeType], {
    drop: m => this.handleDrop(m)
  });

  hovering$ = this.dropTarget.listen(m => m.isOver() && m.canDrop());

  constructor(
    private dnd: SkyhookDndService,
    private graph: GraphService
  ) {}

  ngOnInit() {
    this.graph.getNodes().subscribe(nodes => this.nodes = nodes);
  }

  handleDrop(m: DropTargetMonitor<GraphBlock|GraphNode>) {
    const type = m.getItemType();
    if (type === GraphBlockType) {
      const block = m.getItem() as GraphBlock;
      this.graph.addNode(new GraphNode(block, m.getClientOffset()));
    } else {
      const node = m.getItem() as GraphNode;
      const diff = m.getDifferenceFromInitialOffset();
      node.coords.x += diff.x;
      node.coords.y += diff.y;
    }
  }

  ngOnDestroy(): void {
    this.dropTarget.unsubscribe();
  }
}
