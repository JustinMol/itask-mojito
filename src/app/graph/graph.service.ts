import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { of, Observable } from 'rxjs';
import { TaskService } from '../task/task.service';

/**
 * GraphService provides and persists all nodes and edges for one task.
 */
@Injectable()
export class GraphService {

  private _nodes: any[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private taskService: TaskService
  ) {
    this.taskService.remove$.subscribe(task => {
      this.removeNodes(task.name);
    });
  }

  notifyChange(task: string) {
    this.localStorage.set(task, this._nodes);
  }

  getNodes(task: string): Observable<any[]> {
    this._nodes = this.localStorage.get<any[]>(task) || [];
    return of(this._nodes);
  }

  addNode(task: string, node) {
    this._nodes.push(node);
    this.localStorage.set(task, this._nodes);
  }

  removeNodes(task: string) {
    this.localStorage.set(task, []);
  }
}
