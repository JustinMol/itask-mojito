import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Coordinates, SequenceEdge, ASTNode } from 'src/app/ast/ast';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getGraphBlock } from '../graph-block/graph-block.decorator';

@Directive({
  selector: '[graph-edge]'
})
export class GraphEdgeDirective implements OnInit, OnDestroy {

  @Input('graph-edge') edge: SequenceEdge;

  private destroy$ = new Subject();

  constructor(
    private el: ElementRef<Element>
  ) {}

  ngOnInit() {
    this.moveEdge();
    merge(
      this.edge.to.isMoved$,
      this.edge.from.isMoved$
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
    const el = this.el.nativeElement;
    const points = this.getClosestAnchors(this.edge.from, this.edge.to);
    el.setAttribute('points', points.join(' '));
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
    if (!block || !block.anchors) {
      return [node.coordinates];
    }

    return block.anchors.map(anchor => anchor.scale(50).add(node.coordinates));
  }

}
