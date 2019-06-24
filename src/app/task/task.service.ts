import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { TaskDeclaration } from '../ast/ast';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends DataService<TaskDeclaration> {

  public currentTask$: BehaviorSubject<TaskDeclaration> = new BehaviorSubject(null);

  readonly Model = TaskDeclaration;

  constructor(storage: LocalStorageService) {
    super(storage);
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
