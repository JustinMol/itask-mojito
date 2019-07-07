import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { SidebarResizeEvent } from '../sidebar/sidebar.component';
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ASTService } from '../ast/ast.service';
import { filter, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GraphBlockOptions } from '../graph/graph-block/graph-block.decorator';
import { sources, transforms, controls } from '../graph/graph-block/graph-blocks';
import { TaskDeclaration } from '../ast/task/task-declaration';
import { GraphFrameComponent } from '../graph/graph-frame/graph-frame.component';

import { TaskTransformDeclaration } from '../ast/transforms/task-transform';
import { PatternMatchExpression } from '../ast/values/pattern-match-expression';
import { UserSelectDeclaration } from '../ast/sources/user-select';
import { UserInputDeclaration } from '../ast/sources/user-input';
import { OptionTypeDeclaration } from '../ast/data-type/option-type';
import { OptionTypeService } from '../option-type.service';
import { SharedInputDeclaration } from '../ast/sources/shared-input';
import { RecordTypeService } from '../record-type.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less'],
  providers: [ASTService]
})
export class TaskComponent implements OnInit, OnDestroy {

  @ViewChild(GraphFrameComponent) graphFrame: GraphFrameComponent;

  task: TaskDeclaration;

  private destroy$ = new Subject();

  sources: GraphBlockOptions[] = sources;
  transforms: GraphBlockOptions[] = transforms;
  controls: GraphBlockOptions[] = controls;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private optionTypes: OptionTypeService,
    private recordTypes: RecordTypeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(map => this.taskService.get(map.get('task'))),
      tap(task => this.taskService.selectTask(task))
    ).subscribe(task => this.setTask(task));

    // Navigate to root when `this.task` no longer exists
    this.taskService.getAll().pipe(
      filter(ts => !ts.includes(this.task)),
      takeUntil(this.destroy$)
    ).subscribe(() => this.router.navigate(['']));
  }

  setTask(task) {
    this.task = task;
    this.resizeGraph();
    /* Very hacky way to transform TaskTransformDeclaration.task into task
     * without causing circular dependency:
     * TaskTransformDeclaration -> TaskDeclaration -> NodeDiscriminator -> TaskTransformDeclaration
     */
    this.task.nodes.forEach(n => {
      if (n instanceof TaskTransformDeclaration && n.task) {
        n.task = this.taskService.getSync(n.task.id);
      }

      // Other hacky stuff I'm not proud of
      if ((n instanceof UserInputDeclaration || n instanceof SharedInputDeclaration) && n.type) {
        const t = n.type as any;
        if (t.__type === 'option') {
          n.type = this.optionTypes.getSync(t.id);
        } else if (t.__type === 'record') {
          n.type = this.recordTypes.getSync(t.id);
        }
      }

      if (n instanceof PatternMatchExpression && n.variable) {
        n.variable.type = this.optionTypes.getSync((n.variable.type as any).id);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private sidebarStyle: any = {};

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeGraph();
  }

  onSidebarResize(event: SidebarResizeEvent) {
    const width = event.rectangle.width;
    if (width >= 120) {
      this.sidebarStyle.right = event.rectangle.width + 'px';
      this.resizeGraph();
    }
  }

  resizeGraph() {
    if (this.graphFrame) {
      this.graphFrame.resized$.next();
    }
  }

}
