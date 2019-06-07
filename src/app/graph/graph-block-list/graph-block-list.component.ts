import { Component, Input } from '@angular/core';
import { GraphBlockOptions } from '../graph-block/graph-block.decorator';

@Component({
  selector: 'graph-block-list',
  templateUrl: './graph-block-list.component.html',
  styleUrls: ['./graph-block-list.component.less']
})
export class GraphBlockListComponent {

  @Input() blocks: GraphBlockOptions[];

}
