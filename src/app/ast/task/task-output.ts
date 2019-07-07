import { ASTNode } from '../ast-node/ast-node';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { Variable } from '../values/variable';
import { Type } from 'class-transformer';

@SimpleEditor
@GraphBlock({
    svg: 'assets/svg/source/task-output.svg',
    name: 'Task Output',
    description: '',
})
export class TaskOutput extends ASTNode {
    constructor() {
        super();
    }

    @Type(() => Variable)
    @EditorField({
        type: 'variable',
        input: 'select',
    })
    variable: Variable = null;
}
