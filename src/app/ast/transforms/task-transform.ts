import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { ANCHORS, ASTNode } from '../ast-node/ast-node';
import { TaskDeclaration } from '../task/task-declaration';

@GraphBlock({
    name: 'Task Transform',
    svg: 'assets/svg/transform/task.svg',
    description: '',
    anchors: ANCHORS,
})
export class TaskTransformDeclaration extends ASTNode {
    task: TaskDeclaration = null;
    varName: string = '';
}
