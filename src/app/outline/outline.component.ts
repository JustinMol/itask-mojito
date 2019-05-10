import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.less']
})
export class OutlineComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  addTask() {
    this.taskService.addTask({
      name: `Task #${this.tasks.length + 1}`
    });
  }

  navigateTo(task: Task) {
    this.router.navigate(['/tasks', task.name]);
  }

  getTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

}
