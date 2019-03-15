import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.less']
})
export class OutlineComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

}
