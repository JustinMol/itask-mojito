import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';

declare const SVG: any;

@Directive({
  selector: '[graphNode]'
})
export class GraphNodeDirective implements OnInit, OnDestroy {

  @Input('graphNode') node;

  private elem;

  constructor(
    private el: ElementRef<Element>
  ) {}

  ngOnInit(): void {
    this.elem = SVG.adopt(this.el.nativeElement)
      .draggable()
      .x(this.node.x)
      .y(this.node.y)
      .attr({
        href: this.node.block.svg,
      })
      .on('dragmove.namespace', e => this.snapToGrid(e, 10))
      .on('dragend.namespace', () => this.moveNode());
  }

  private snapToGrid(e: Event & { detail: any }, gridSize: number) {
    e.preventDefault();

    const { handler, box } = e.detail;
    handler.move(box.x - box.x % gridSize, box.y - box.y % gridSize);
  }

  private moveNode() {
    this.node.x = this.elem.x();
    this.node.y = this.elem.y();
  }

  ngOnDestroy(): void {
    this.elem.off('dragmove.namespace');
    this.elem.off('dragend.namespace');
  }

}
