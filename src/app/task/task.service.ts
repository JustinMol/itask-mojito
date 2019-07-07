import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { DataService } from '../data.service';
import { TaskDeclaration } from '../ast/task/task-declaration';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends DataService<TaskDeclaration> {

  public currentTask$: BehaviorSubject<TaskDeclaration> = new BehaviorSubject(null);

  constructor(storage: LocalStorageService) {
    super(storage, TaskDeclaration);
  }

  getAll(): Observable<TaskDeclaration[]> {
    const models$ = super.getAll();
    this.models.map(task => {
      for (const node of task.nodes) {
        for (const edge of task.edges) {
          if (edge.from.equals(task.input)) {
            edge.from = task.input;
          }
          if (edge.to.equals(task.output)) {
            edge.to = task.output;
          }
          if (edge.from.equals(node)) {
            edge.from = node;
          } else if (edge.to.equals(node)) {
            edge.to = node;
          }
        }
      }
    });

    return models$;
  }

  rename(model: TaskDeclaration) {
    const name = window.prompt('Enter a new name');
    if (!name) return;
    if (!/^[a-zA-Z][a-zA-Z0-9]+$/.test(name)) return this.rename(model);
    model.name = name;
    this.update(model);
  }

  save(task?: TaskDeclaration): void {
    if (task === undefined) {
      return this.models.forEach(t => this.update(t));
    }

    this.update(task);
  }

  selectTask(task: TaskDeclaration): void {
    this.currentTask$.next(task);
  }

  newTask(): Observable<TaskDeclaration> {
    const highest = this.models
      .filter(t => t.name.startsWith('Task'))
      .map(t => {
        const regexed = /Task-(\d+)/.exec(t.name);
        return parseInt(regexed[1]);
      })
      .reduce((prev, curr) => prev >= curr ? prev : curr, 0);

    return this.create(new TaskDeclaration(`Task-${highest + 1}`));
  }

}
