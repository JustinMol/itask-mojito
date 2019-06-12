import { Directive, Input, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GraphBlockOptions, getGraphBlock } from '../graph-block/graph-block.decorator';
import { ASTNode, Coordinates } from 'src/app/ast/ast';

declare const SVG: any;

@Directive({
  selector: '[graph-node]'
})
export class GraphNodeDirective implements OnInit, OnDestroy {

  @Input('graph-node') node: ASTNode;
  @Output('moved') moved$ = new EventEmitter<Coordinates>();
  @Output('clicked') clicked$ = new EventEmitter<void>();

  private elem;
  private graphBlock: GraphBlockOptions;

  constructor(
    private el: ElementRef<Element>
  ) {}

  ngOnInit(): void {
    this.graphBlock = getGraphBlock(this.node.constructor);
    this.elem = SVG.adopt(this.el.nativeElement)
      .draggable()
      .x(this.node.coordinates.x - this.node.coordinates.x % 10)
      .y(this.node.coordinates.y - this.node.coordinates.y % 10)
      .attr({
        href: this.graphBlock.svg,
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
      this.clicked$.emit();
    } else {
      this.moved$.emit({ x: this.elem.x(), y: this.elem.y() });
    }
  }

  private moveNode() {
    
  }

  ngOnDestroy(): void {
    this.elem.off('dragmove.namespace');
    this.elem.off('dragend.namespace');
    this.elem.off('click');
    this.moved$.complete();
  }

}
