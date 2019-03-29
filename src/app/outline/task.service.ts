import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export declare type Task = {
  name: string
};

const TASKS = [
  { name: 'selectDeveloper' },
  { name: 'selectAssessor' },
  { name: 'confirmCriticalBug' },
  { name: 'solveBug' },
  { name: 'solveCriticalBug' },
  { name: 'reportBug' }
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  addTask(task: Task): void {
    TASKS.push(task);
  }

}
