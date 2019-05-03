import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropTargetMonitor } from '@angular-skyhook/core';
import { GraphBlock } from '../graph-block';

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
    private el: ElementRef<Element>
  ) {}

  ngOnInit() {
    this.svg = SVG(this.el.nativeElement.firstElementChild);
    this.drawGrid();
  }

  drawGrid() {
    const grid = this.svg.defs().pattern(GRID_SIZE, GRID_SIZE, add => {
      add.line(0, 0, 0, GRID_SIZE).stroke({ width: 0.2, color: '#a9b4af' });
      add.line(0, 0, GRID_SIZE, 0).stroke({ width: 0.2, color: '#a9b4af' });
    });

    this.svg.rect().attr({
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

    this.svg.image(block.svg).x(x).y(y);
  }

}
