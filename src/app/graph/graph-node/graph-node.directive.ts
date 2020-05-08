import { Directive, Input, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GraphBlockOptions, getGraphBlock } from '../graph-block/graph-block.decorator';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';
import { Coordinates } from 'src/app/ast/ast-node/coordinates';
import { adopt, Element } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';

const GRID_SIZE_SMALL = 25;

@Directive({
  selector: '[graph-node]'
})
export class GraphNodeDirective implements OnInit, OnDestroy {

  @Input('graph-node') node: ASTNode;
  @Output('moved') isMoved$ = new EventEmitter<Coordinates>();
  @Output('clicked') clicked$ = new EventEmitter<Event>();

  private svg: Element;
  private graphBlock: GraphBlockOptions;
  private moved = false;

  constructor(
    private el: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.graphBlock = getGraphBlock(this.node.constructor);
    this.svg = adopt(this.el.nativeElement);

    this.svg
      .draggable()
      .x(this.x)
      .y(this.y)
      .attr({
        href: this.graphBlock.svg,
      })
      .on('dragmove.namespace', e => this.onDrag(e, GRID_SIZE_SMALL))
      .on('dragend.namespace', e => this.onDragEnd(e));
  }

  private onDrag(e: Event & { detail: any }, gridSize: number) {
    e.preventDefault();

    const { handler, box } = e.detail;
    const coords = new Coordinates(box.x, box.y).snap(gridSize);

    if (coords.x !== this.x || coords.y !== this.y) {
      handler.move(coords.x, coords.y);
      this.isMoved$.emit(coords);
      this.moved = true;
    }
  }

  private onDragEnd(event: Event) {
    event.stopImmediatePropagation();
    if (!this.moved) {
      this.clicked$.emit(event);
    } else {
      this.isMoved$.emit(new Coordinates(this.svg.x(), this.svg.y()));
    }

    this.moved = false;
  }

  private get x() {
    return this.node.coordinates.x;
  }

  private get y() {
    return this.node.coordinates.y;
  }

  ngOnDestroy(): void {
    this.svg
      .off('dragmove.namespace')
      .off('dragend.namespace');
  }

}
