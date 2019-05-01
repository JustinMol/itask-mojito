import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GraphNode } from './graph-node';

const NODES: GraphNode[] = [];

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() {}

  public getNodes(): Observable<GraphNode[]> {
    return of(NODES);
  }

  public addNode(node: GraphNode): void {
    NODES.push(node);
  }
}
