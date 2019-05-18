import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Task } from '../task';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => this.tasks = tasks);
  }

  newTask(): Task {
    return this.taskService.newTask();
  }

  removeTask(task: Task): void {
    this.taskService.removeTask(task);
  }

  navigateTo(task: Task) {
    this.router.navigate(['/tasks', task.id]);
  }

}
