import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarResizeEvent } from '../sidebar/sidebar.component';
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ASTService } from '../ast/ast.service';
import { filter, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GraphBlockOptions } from '../graph/graph-block/graph-block.decorator';
import { sources, transforms, controls } from '../graph/graph-block/graph-blocks';
import { TaskDeclaration } from '../ast/task/task-declaration';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less'],
  providers: [ASTService]
})
export class TaskComponent implements OnInit, OnDestroy {

  task: TaskDeclaration;

  private destroy$ = new Subject();

  sources: GraphBlockOptions[] = sources;
  transforms: GraphBlockOptions[] = transforms;
  controls: GraphBlockOptions[] = controls;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(map => this.taskService.get(map.get('task'))),
      tap(task => this.taskService.selectTask(task))
    ).subscribe(task => this.task = task);

    // Navigate to root when `this.task` no longer exists
    this.taskService.getAll().pipe(
      filter(ts => !ts.includes(this.task)),
      takeUntil(this.destroy$)
    ).subscribe(() => this.router.navigate(['']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private sidebarStyle: any = {};

  onSidebarResize(event: SidebarResizeEvent) {
    const width = event.rectangle.width;
    if (width >= 120) {
      this.sidebarStyle.right = event.rectangle.width + 'px';
    }
  }

}
