import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarResizeEvent } from '../sidebar/sidebar.component';
import { GraphBlockService } from '../graph/graph-block/graph-block.service';
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from './task';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { GraphService } from '../graph/graph.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less'],
  providers: [GraphService]
})
export class TaskComponent implements OnInit, OnDestroy {

  task: Task;

  style: any = {};

  private subscription: Subscription;

  constructor(
    private graphBlockService: GraphBlockService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSidebarResize(event: SidebarResizeEvent) {
    const width = event.rectangle.width;
    if (width >= 120) {
      this.style.right = event.rectangle.width + 'px';
    }
  }

  ngOnInit(): void {
    this.subscription = this.taskService.tasks$.pipe(
      filter(ts => this.task && ts.findIndex(t => t.id === this.task.id) === -1)
    ).subscribe(() => this.router.navigate(['']));

    this.route.paramMap.subscribe(map => {
      this.task = this.taskService.getTask(map.get('task'));
      if (!this.task) {
        return this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
