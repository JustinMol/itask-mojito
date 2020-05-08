import { Directive, Input, ElementRef, OnInit, OnDestroy, OnChanges, ViewChild, HostBinding } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getGraphBlock } from '../graph-block/graph-block.decorator';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';
import { Coordinates } from 'src/app/ast/ast-node/coordinates';
import { SequenceEdge } from 'src/app/ast/edge/sequence-edge';
import { Edge } from 'src/app/ast/edge/edge';
import { SVG } from '@svgdotjs/svg.js';

@Directive({
  selector: '[graph-edge]'
})
export class GraphEdgeDirective implements OnInit, OnDestroy {

  @Input('graph-edge') edge: Edge;
  @HostBinding('class.option') isOption: boolean;
  @HostBinding('class.sequence') isSequence: boolean;

  private line: any;
  private destroy$ = new Subject();

  constructor(
    private el: ElementRef<SVGPolylineElement>
  ) {}

  ngOnInit() {
    this.isSequence = this.edge instanceof SequenceEdge;
    this.isOption = !this.isSequence;
    this.line = SVG<SVGPolylineElement>(this.el.nativeElement);
    this.moveEdge();
    merge(
      this.edge.to.hasChanged,
      this.edge.from.hasChanged
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.moveEdge();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  private moveEdge() {
    const points = this.getClosestAnchors(this.edge.from, this.edge.to);
    this.line.plot(points.map(c => [c.x, c.y]));
  }

  private getClosestAnchors(node1: ASTNode, node2: ASTNode): [Coordinates, Coordinates] {
    const ps1 = this.getAnchorCoordinates(node1),
      ps2 = this.getAnchorCoordinates(node2);

    let min = Number.MAX_VALUE;
    let closest: [Coordinates, Coordinates];
    for (const p1 of ps1) {
      for (const p2 of ps2) {
        const d = p1.distance(p2);
        if (d < min) {
          min = d;
          closest = [p1, p2];
        }
      }
    }

    return closest;
  }

  private getAnchorCoordinates(node: ASTNode) {
    const block = getGraphBlock(node.constructor);
    if (!block) {
      return [node.coordinates];
    }

    return block.getAnchorCoordinates(node.coordinates);
  }

}
