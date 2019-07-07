import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';
import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { Type } from 'class-transformer';
import { Variable } from '../values/variable';

@SimpleEditor
@GraphBlock({
    name: 'Task Transform',
    svg: 'assets/svg/transform/task.svg',
    description: 'Call another task and use the result',
    anchors: DEFAULT_ANCHORS,
})
export class TaskTransformDeclaration extends ASTNode {
    // task: TaskDeclaration
    @EditorField({ input: 'select', type: 'task' }) task: any = null;
    @EditorField({ label: 'variable name' }) varName: string = '';

    @Type(() => Variable)
    @EditorField({ input: 'select', type: 'variable' })
    input: Variable = null;

    getOutput() {
        const task = (this.task as any);
        if (!task) return null;

        const output = task.output;
        if (!output || !output.variable) return null;

        return new Variable(this.varName, output.variable.type);
    }
}
