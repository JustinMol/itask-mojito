import { Injectable, OnDestroy } from '@angular/core';
import { ASTNode, TaskDeclaration } from './ast';
import { TaskService } from '../task/task.service';
import { filter } from 'rxjs/operators';

@Injectable()
export class ASTService implements OnDestroy {

  private task: TaskDeclaration;

  constructor(
    private taskService: TaskService
  ) {
    this.taskService.currentTask$.pipe(
      filter(t => t !== null)
    ).subscribe(t => this.task = t);
  }

  addNode(node: ASTNode): void {
    this.task.body.push(node);
    this.taskService.save(this.task);
  }

  getNode(id: string): ASTNode {
    if (!this.task) return null;
    return this.task.body.find(node => node.id === id);
  }

  save() {
    this.taskService.save(this.task);
  }

  ngOnDestroy(): void {}
}
