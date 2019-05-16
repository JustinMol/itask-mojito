import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarResizeEvent } from '../sidebar/sidebar.component';
import { GraphBlockService } from '../graph/graph-block.service';
import { Task, TaskService } from '../outline/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit, OnDestroy {

  task: Task;

  private _removedSub: Subscription;

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
    this._removedSub = this.taskService.remove$.subscribe(t => {
      if (this.task.name === t.name) {
        return this.router.navigate(['']);
      }
    });
    this.route.paramMap.subscribe(map => {
      this.task = this.taskService.getTask(map.get('task'));
      if (!this.task) {
        return this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    this._removedSub.unsubscribe();
  }

}
