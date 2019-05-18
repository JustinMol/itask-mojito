import { Component, OnInit } from '@angular/core';
import { SidebarResizeEvent } from '../sidebar/sidebar.component';
import { GraphBlockService } from '../graph/graph-block.service';
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from './task';
import { filter } from 'rxjs/operators';

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
    this.taskService.tasks$.pipe(
      filter(ts => this.task && ts.findIndex(t => t.id === this.task.id) === -1)
    ).subscribe(() => this.router.navigate(['']));

    this.route.paramMap.subscribe(map => {
      this.task = this.taskService.getTask(map.get('task'));
      if (!this.task) {
        return this.router.navigate(['']);
      }
    });
  }

}
