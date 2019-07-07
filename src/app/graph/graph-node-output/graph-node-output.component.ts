import { Component, Input } from '@angular/core';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';
import { TaskTransformDeclaration } from 'src/app/ast/transforms/task-transform';
import { TaskService } from 'src/app/task/task.service';

@Component({
  selector: '[graph-node-output]',
  templateUrl: './graph-node-output.component.html',
  styleUrls: ['./graph-node-output.component.less']
})
export class GraphNodeOutputComponent {

  @Input() node: ASTNode;

  constructor(private tasks: TaskService) {}

  getOutput() {
    if (!this.node) return null;
    return this.node.getOutput();
  }

}
