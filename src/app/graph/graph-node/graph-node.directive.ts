import { Directive, Input, ElementRef, OnInit, OnDestroy, Output, EventEmitter, HostBinding } from '@angular/core';
import { GraphBlockOptions, getGraphBlock } from '../graph-block/graph-block.decorator';
import { ASTNode, Coordinates } from 'src/app/ast/ast';

declare const SVG: any;

const GRID_SIZE_SMALL = 20;

@Directive({
  selector: '[graph-node]'
})
export class GraphNodeDirective implements OnInit, OnDestroy {

  @Input('graph-node') node: ASTNode;
  @Output('moved') isMoved$ = new EventEmitter<Coordinates>();
  @Output('clicked') clicked$ = new EventEmitter<void>();

  private elem: any;
  private graphBlock: GraphBlockOptions;
  private moved = false;

  constructor(
    private el: ElementRef<Element>
  ) {}

  ngOnInit(): void {
    this.graphBlock = getGraphBlock(this.node.constructor);
    this.elem = SVG.adopt(this.el.nativeElement);

    this.elem
      .draggable()
      .x(this.x)
      .y(this.y)
      .attr({
        href: this.graphBlock.svg,
      })
      .on('mouseover', () => this.focus())
      .on('mouseleave', () => this.unfocus())
      .on('dragmove.namespace', e => this.onDrag(e, GRID_SIZE_SMALL))
      .on('dragend.namespace', () => this.onDragEnd());

    const parent = this.elem.parent();
    for (const anchor of this.graphBlock.anchors || []) {
      // parent
      //   .circle(5)
      //   .fill('tomato')
      //   .x(this.x + anchor.x * 50 - 2.5)
      //   .y(this.y + anchor.y * 50 - 2.5);
    }
  }

  private focus() {
    this.elem.transform({
      scale: 1.1,
    });
  }

  private unfocus() {
    this.elem.transform({
      scale: 1,
    });
  }

  private onDrag(e: Event & { detail: any }, gridSize: number) {
    e.preventDefault();

    this.unfocus();
    const { handler, box } = e.detail;
    const x = this.snap(box.x, gridSize);
    const y = this.snap(box.y, gridSize);

    if (x !== this.x || y !== this.y) {
      handler.move(x, y);
      this.isMoved$.emit(new Coordinates(x, y));
      this.moved = true;
    }
  }

  private onDragEnd() {
    if (!this.moved) {
      this.clicked$.emit();
    } else {
      this.isMoved$.emit(new Coordinates(this.elem.x(), this.elem.y()));
    }

    this.moved = false;
  }

  private snap(x: number, gridSize) {
    return Math.ceil(x / gridSize) * gridSize;
  }

  private get x() {
    return this.node.coordinates.x;
  }

  private get y() {
    return this.node.coordinates.y;
  }

  ngOnDestroy(): void {
    this.elem
      .off('mouseover')
      .off('mouseleave')
      .off('dragmove.namespace')
      .off('dragend.namespace');
  }

}
