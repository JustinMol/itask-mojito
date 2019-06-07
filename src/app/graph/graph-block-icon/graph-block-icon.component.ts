import { Component, Input } from '@angular/core';
import { GraphBlockOptions } from '../graph-block/graph-block.decorator';

@Component({
  selector: 'graph-block-icon',
  templateUrl: './graph-block-icon.component.html',
  styleUrls: ['./graph-block-icon.component.less']
})
export class GraphBlockIconComponent {

  @Input() block: GraphBlockOptions;

}
