import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DropTargetMonitor } from '@angular-skyhook/core';
import { GraphBlock } from '../graph-block';

declare const SVG: any;

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
