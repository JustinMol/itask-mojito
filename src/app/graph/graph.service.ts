import { Injectable } from '@angular/core';
import { TaskService } from '../task/task.service';
import { Task } from '../task/task';
import { GraphNode } from './graph-node/graph-node';

/**
 * GraphService provides and persists all nodes and edges for one task.
 */
@Injectable()
export class GraphService {

  private task: Task;

  constructor(
    private taskService: TaskService
  ) {}

  setTask(task: Task) {
    this.task = task;
  }

  getNode(id: string): GraphNode {
    return this.task.nodes.find(n => n.id === id);
  }

  getNodes(): GraphNode[] {
    return this.task.nodes;
  }

  addNode(node: GraphNode) {
    this.task.nodes.push(node);
    this.taskService.updateTask(this.task);
  }

  moveNode(node: GraphNode) {
    this.taskService.updateTask(this.task);
  }

  removeNodes() {
    this.task.nodes = [];
    this.taskService.updateTask(this.task);
  }
}
