import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphBlock } from '../graph-block';

@Component({
  selector: 'graph-block-list',
  templateUrl: './graph-block-list.component.html',
  styleUrls: ['./graph-block-list.component.less']
})
export class GraphBlockListComponent implements OnInit {

  @Input('blocks') blocks$: Observable<GraphBlock[]>

  blocks = [];

  ngOnInit() {
    this.blocks$.subscribe(blocks => this.blocks = blocks);
  }

  tryMe(x) {
    console.log(x);
  }

}
