import { Component, Input } from '@angular/core';
import { SkyhookDndService } from '@angular-skyhook/core';
import { GraphBlock, GraphBlockType } from '../graph-block';

@Component({
  selector: 'app-graph-block',
  templateUrl: './graph-block.component.html',
  styleUrls: ['./graph-block.component.less']
})
export class GraphBlockComponent {

  @Input() block: GraphBlock;

  dragSource = this.dnd.dragSource(GraphBlockType, {
    beginDrag: () => this.block,
  });

  dragging$ = this.dragSource.listen(m => m.isDragging());

  constructor(
    private dnd: SkyhookDndService
  ) {}

  ngOnDestroy(): void {
    this.dragSource.unsubscribe();
  }

}
