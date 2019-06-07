import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { TaskDeclaration } from '../ast/ast';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks$: BehaviorSubject<TaskDeclaration[]>;
  public currentTask$: BehaviorSubject<TaskDeclaration> = new BehaviorSubject(null);

  private tasks: TaskDeclaration[] = [];

  constructor(
    private storage: LocalStorageService
  ) {
    this.tasks = this.storage.getAll(TaskDeclaration);
    this.tasks$ = new BehaviorSubject(this.tasks);
  }

  save(task?: TaskDeclaration | string): void {
    if (task === undefined) {
      return this.tasks.forEach(t => this.storage.save<TaskDeclaration>(t));
    }

    const _task: TaskDeclaration = typeof task === 'string' ? this.getTask(task) : task;
    if (_task === null) return;

    this.storage.save<TaskDeclaration>(_task);
  }

  selectTask(task: TaskDeclaration | string): TaskDeclaration {
    let _task: TaskDeclaration = typeof task === 'string' ? this.getTask(task) : task;
    this.currentTask$.next(_task);
    return _task;
  }

  getTask(id: string): TaskDeclaration {
    return this.tasks.find(t => t.id === id);
  }

  newTask(): TaskDeclaration {
    const highest = this.tasks
      .filter(t => t.name.startsWith('Untitled'))
      .map(t => {
        const regexed = /Untitled-(\d+)/.exec(t.name);
        return parseInt(regexed[1]);
      })
      .reduce((prev, curr) => prev >= curr ? prev : curr, 0);

    return this.createTask(`Untitled-${highest + 1}`);
  }

  createTask(name: string): TaskDeclaration {
    const task = new TaskDeclaration(name);
    this.tasks.push(task);
    this.storage.save(task);
    this.tasks$.next(this.tasks);
    return task;
  }

  removeTask(task: TaskDeclaration): void {
    this.storage.remove(task);
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }

    this.tasks$.next(this.tasks);
  }

}
