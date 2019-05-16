import { Directive, Input, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GraphService } from './graph.service';

declare const SVG: any;

@Directive({
  selector: '[graphNode]'
})
export class GraphNodeDirective implements OnInit, OnDestroy {

  @Input('graphNode') node;
  @Output('moved') moved$ = new EventEmitter<any>();

  private elem;

  constructor(
    private el: ElementRef<Element>,
    private graph: GraphService
  ) {}

  ngOnInit(): void {
    this.elem = SVG.adopt(this.el.nativeElement)
      .draggable()
      .x(this.node.x - this.node.x % 10)
      .y(this.node.y - this.node.y % 10)
      .attr({
        href: this.node.block.svg,
      })
      .on('dragmove.namespace', e => this.snapToGrid(e, 10))
      .on('dragend.namespace', e => this.onDragEnd(e));
  }

  private snapToGrid(e: Event & { detail: any }, gridSize: number) {
    e.preventDefault();

    const { handler, box } = e.detail;
    handler.move(box.x - box.x % gridSize, box.y - box.y % gridSize);
  }

  private onDragEnd(e) {
    const { x, y } = e.detail.handler.box;
    if (this.elem.x() === x && this.elem.y() === y) {
      this.onClick();
    } else {
      this.moveNode();
    }
  }

  private onClick() {
    console.log('(todo) graph-node onClick');
  }

  private moveNode() {
    this.node.x = this.elem.x();
    this.node.y = this.elem.y();
    this.moved$.emit(this.node);
  }

  ngOnDestroy(): void {
    this.elem.off('dragmove.namespace');
    this.elem.off('dragend.namespace');
    this.elem.off('click');
    this.moved$.complete();
  }

}
