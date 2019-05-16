import { Component, OnInit } from '@angular/core';
import { SidebarResizeEvent } from '../sidebar/sidebar.component';
import { GraphBlockService } from '../graph/graph-block.service';
import { Task, TaskService } from '../outline/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  task: Task;

  constructor(
    private graphBlockService: GraphBlockService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  style: any = {};

  onSidebarResize(event: SidebarResizeEvent) {
    const width = event.rectangle.width;
    if (width >= 120) {
      this.style.right = event.rectangle.width + 'px';
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(map => {
      this.task = this.taskService.getTask(map.get('name'));
      if (!this.task) {
        return this.router.navigate(['']);
      }
    });
  }

}
