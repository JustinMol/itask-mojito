import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private nodes = [];

  public nodes$ = of(this.nodes);
  
  constructor() {}

  addNode(node) {
    this.nodes.push(node);
  }
}
