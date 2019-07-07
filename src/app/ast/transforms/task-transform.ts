import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';
import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';

@SimpleEditor
@GraphBlock({
    name: 'Task Transform',
    svg: 'assets/svg/transform/task.svg',
    description: 'Call another task and use the result',
    anchors: DEFAULT_ANCHORS,
})
export class TaskTransformDeclaration extends ASTNode {
    @EditorField({ input: 'select', type: 'task' }) task: string = '';
    @EditorField({ label: 'variable name' }) varName: string = '';

    getOutput() {
        return this.varName;
    }
}
