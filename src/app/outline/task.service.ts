import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { GraphService } from '../graph/graph.service';

export declare type Task = {
  name: string
};

const UNTITLED = 'Untitled';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Task[] = [];

  public remove$: EventEmitter<Task> = new EventEmitter();

  constructor(
    private localStorage: LocalStorageService
  ) {}

  getTask(name: string): Task {
    const found = this._tasks.filter(t => t.name === name);
    return found[0];
  }

  getTasks(): Observable<Task[]> {
    this._tasks = this.localStorage.get('tasks') || [];
    return of(this._tasks);
  }

  newTask(): Task {
    const highest = this._tasks
      .filter(t => t.name.startsWith(UNTITLED))
      .map(t => {
        const regexed = /.*-(\d+)/.exec(t.name);
        return parseInt(regexed[1]);
      })
      .reduce((prev, curr) => prev >= curr ? prev : curr, 0);

    const newName = `${UNTITLED}-${highest + 1}`;
    return this.addTask({
      name: newName
    });
  }

  addTask(task: Task): Task {
    this._tasks.push(task);
    this.localStorage.set('tasks', this._tasks);
    return task;
  }

  removeTask(task: Task): void {
    const index = this._tasks.findIndex(t => t.name === task.name);
    if (index > -1) {
      this._tasks.splice(index, 1);
      this.localStorage.set('tasks', this._tasks);
      this.remove$.emit(task);
    }
  }

}
