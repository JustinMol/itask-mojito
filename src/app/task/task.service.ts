import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks$: BehaviorSubject<Task[]>;

  private _tasks: Task[] = [];

  constructor(
    private localStorage: LocalStorageService
  ) {
    this._tasks = this.localStorage.keys()
      .filter(k => k.startsWith('task'))
      .map(k => Task.from(this.localStorage.get(k)))
      .filter(t => t !== null);

    this.tasks$ = new BehaviorSubject(this._tasks);
  }

  getTask(id: string): Task {
    return this._tasks.find(t => t.id === id);
  }

  newTask(): Task {
    const highest = this._tasks
      .filter(t => t.name.startsWith('Untitled'))
      .map(t => {
        const regexed = /Untitled-(\d+)/.exec(t.name);
        return parseInt(regexed[1]);
      })
      .reduce((prev, curr) => prev >= curr ? prev : curr, 0);

    const newName = `Untitled-${highest + 1}`;
    return this.createTask(new Task(newName));
  }

  createTask(task: Task): Task {
    this._tasks.push(task);
    this.saveToStorage(task);
    this.tasks$.next(this._tasks);
    return task;
  }

  updateTask(task: Task): Task {
    this.saveToStorage(task);
    return task;
  }

  removeTask(task: Task): void {
    this.deleteFromStorage(task);
    const index = this._tasks.findIndex(t => t.id === task.id);
    if (index >= 0) {
      this._tasks.splice(index, 1);
    }
    this.tasks$.next(this._tasks);
  }

  private saveToStorage(task: Task) {
    this.localStorage.set(`task-${task.id}`, task);
  }

  private deleteFromStorage(task: Task) {
    this.localStorage.remove(`task-${task.id}`);
  }

}
