import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-block',
  templateUrl: './graph-block.component.html',
  styleUrls: ['./graph-block.component.less']
})
export class GraphBlockComponent implements OnInit {

  @Input() block;

  constructor() { }

  ngOnInit() {
  }

}
