import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export declare type Task = {
  name: string
};

const UNTITLED = 'Untitled';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Task[] = [];

  getTask(name: string): Task {
    const found = this._tasks.filter(t => t.name === name);
    return found[0];
  }

  getTasks(): Observable<Task[]> {
    return of(this._tasks);
  }

  newTask(): void {
    const untitled = this._tasks.filter(t => t.name.startsWith(UNTITLED));
    const newName = `${UNTITLED}-${untitled.length + 1}`;
    return this.addTask({
      name: newName
    });
  }

  addTask(task: Task): void {
    this._tasks.push(task);
  }

}
