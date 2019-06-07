import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskDeclaration } from 'src/app/ast/ast';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  tasks: TaskDeclaration[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => this.tasks = tasks);
  }

  onSelect(task: TaskDeclaration) {
    return this.router.navigate(['/tasks', task.id]);
  }

  onDelete(task: TaskDeclaration): void {
    this.taskService.removeTask(task);
  }

}
