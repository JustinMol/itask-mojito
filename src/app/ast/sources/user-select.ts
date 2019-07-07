import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { ASTNode, ANCHORS_SQUARE } from '../ast-node/ast-node';
import { Variable } from '../values/variable';

@SimpleEditor
@GraphBlock({
    name: 'User Select',
    svg: 'assets/svg/source/user-select.svg',
    description: 'Ask the user to choose from a list.',
    anchors: ANCHORS_SQUARE
})
export class UserSelectDeclaration extends ASTNode {
    @EditorField({ label: 'variable name' }) varName: string = '';

    @EditorField({ type: 'variable', input: 'select' })
    list: Variable = null;

    @EditorField() message: string = '';

    getOutput() {
        return new Variable(this.varName, null);
    }
}
