import { Component } from '@angular/core';
import { SkyhookDndService, DropTargetMonitor } from '@angular-skyhook/core';
import { GraphBlock, GraphBlockType } from '../graph-block';

@Component({
  selector: 'app-graph-frame',
  templateUrl: './graph-frame.component.html',
  styleUrls: ['./graph-frame.component.less']
})
export class GraphFrameComponent {

  dropTarget = this.dnd.dropTarget<GraphBlock>(GraphBlockType, {
    drop: m => this.handleDrop(m)
  });

  hovering$ = this.dropTarget.listen(m => m.isOver() && m.canDrop());

  constructor(
    private dnd: SkyhookDndService
  ) {}

  handleDrop(m: DropTargetMonitor<GraphBlock>) {
      const block = m.getItem();
      if (!block.id) {
        console.log('New block', block);
      }
  }

  ngOnDestroy(): void {
    this.dropTarget.unsubscribe();
  }
}
