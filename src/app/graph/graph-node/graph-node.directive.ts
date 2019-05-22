import { Directive, Input, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GraphNode } from './graph-node';
import { Router, ActivatedRoute } from '@angular/router';
import { GraphBlock } from '../graph-block/graph-block';
import { GraphBlockService } from '../graph-block/graph-block.service';

declare const SVG: any;

@Directive({
  selector: '[graphNode]'
})
export class GraphNodeDirective implements OnInit, OnDestroy {

  @Input('graphNode') node: GraphNode;
  @Output('moved') moved$ = new EventEmitter<any>();

  private elem;
  private graphBlock: GraphBlock;

  constructor(
    private el: ElementRef<Element>,
    private router: Router,
    private route: ActivatedRoute,
    private graphBlockService: GraphBlockService
  ) {}

  ngOnInit(): void {
    this.graphBlock = this.graphBlockService.getGraphBlock(this.node.type);
    this.elem = SVG.adopt(this.el.nativeElement)
      .draggable()
      .x(this.node.coords.x - this.node.coords.x % 10)
      .y(this.node.coords.y - this.node.coords.y % 10)
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
      this.onClick();
    } else {
      this.moveNode();
    }
  }

  private onClick() {
    this.router.navigate(
      ['./nodes', this.node.id],
      { relativeTo: this.route, state: this.node }
    );
  }

  private moveNode() {
    this.node.coords.x = this.elem.x();
    this.node.coords.y = this.elem.y();
    this.moved$.emit(this.node);
  }

  ngOnDestroy(): void {
    this.elem.off('dragmove.namespace');
    this.elem.off('dragend.namespace');
    this.elem.off('click');
    this.moved$.complete();
  }

}
