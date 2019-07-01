import { Injectable, OnDestroy } from '@angular/core';
import { ASTNode, TaskDeclaration, Edge, SequenceEdge } from './ast';
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
    this.task.nodes.push(node);
    this.save();
  }

  getNode(id: string): ASTNode {
    if (!this.task) return null;
    return this.task.nodes.find(node => node.id === id);
  }

  getEdges() {
    return this.task.edges;
  }

  addEdge(edge: Edge) {
    this.task.edges.push(edge);
    this.save();
  }

  save() {
    this.taskService.save(this.task);
  }

  ngOnDestroy(): void {}
}
