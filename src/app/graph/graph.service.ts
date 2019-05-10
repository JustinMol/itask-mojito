import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs';

/**
 * GraphService provides and persists all nodes and edges for one task.
 */
@Injectable()
export class GraphService {

  public nodes$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  private _nodes: any[] = [];

  constructor(
    private localStorage: LocalStorageService
  ) {}

  addNode(task: string, node) {
    this._nodes.push(node);
    this.nodes$.next(this._nodes);
  }
}
