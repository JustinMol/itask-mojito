import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphService } from '../graph.service';
import { map } from 'rxjs/operators';
import { GraphNode } from '../graph-node/graph-node';

@Component({
  selector: 'app-graph-node-editor',
  templateUrl: './graph-node-editor.component.html',
  styleUrls: ['./graph-node-editor.component.less']
})
export class GraphNodeEditorComponent implements OnInit {

  node: GraphNode;

  constructor(
    private route: ActivatedRoute,
    private graph: GraphService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => this.graph.getNode(params.get('node')))
    ).subscribe(node => this.node = node);
  }

}
