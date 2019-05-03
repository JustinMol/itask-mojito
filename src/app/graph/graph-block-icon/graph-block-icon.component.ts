import { Component, OnInit, Input } from '@angular/core';
import { GraphBlock } from '../graph-block';

@Component({
  selector: 'graph-block-icon',
  templateUrl: './graph-block-icon.component.html',
  styleUrls: ['./graph-block-icon.component.less']
})
export class GraphBlockIconComponent implements OnInit {

  @Input() block: GraphBlock;

  constructor() { }

  ngOnInit() {
  }

}
