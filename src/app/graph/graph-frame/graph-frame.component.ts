import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropTargetMonitor } from '@angular-skyhook/core';
import { GraphBlock } from '../graph-block';
import { GraphService } from '../graph.service';

declare const SVG: any;

const GRID_SIZE = 100;

@Component({
  selector: 'app-graph-frame',
  templateUrl: './graph-frame.component.html',
  styleUrls: ['./graph-frame.component.less']
})
export class GraphFrameComponent implements OnInit {

  private svg;

  constructor(
    private el: ElementRef<Element>,
    private graph: GraphService
  ) {}

  ngOnInit() {
    this.svg = SVG(this.el.nativeElement.firstElementChild);
    this.drawGrid(GRID_SIZE, 0.2);
    this.drawGrid(20, 0.1);
  }

  drawGrid(gridSize, strokeWidth) {
    const grid = this.svg.defs().pattern(gridSize, gridSize, add => {
      add
        .line(0, 0, 0, gridSize)
        .stroke({ width: strokeWidth, color: '#a9b4af' });
      add
        .line(0, 0, gridSize, 0)
        .stroke({ width: strokeWidth, color: '#a9b4af' });
    });

    this.svg.rect().back().attr({
      width: '100%',
      height: '100%',
      fill: grid,
    });
  }

  onDrop(m: DropTargetMonitor<GraphBlock>) {
    const offset = m.getClientOffset();
    const bounds = this.svg.node.getBoundingClientRect();
    const x = offset.x - bounds.left;
    const y = offset.y - bounds.top;
    const block = m.getItem();
    this.graph.addNode({ x, y, block });
  }

}