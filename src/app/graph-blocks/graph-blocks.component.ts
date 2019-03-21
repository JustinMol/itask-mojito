import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphBlock } from '../graph-block';

@Component({
  selector: 'app-graph-blocks',
  templateUrl: './graph-blocks.component.html',
  styleUrls: ['./graph-blocks.component.less']
})
export class GraphBlocksComponent implements OnInit {

  @Input('blocks') blocks$: Observable<GraphBlock[]>

  blocks = [];

  ngOnInit() {
    this.blocks$.subscribe(blocks => this.blocks = blocks);
  }

}
