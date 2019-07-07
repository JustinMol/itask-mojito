import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { ANCHORS_SQUARE, ASTNode } from '../ast-node/ast-node';

@SimpleEditor
@GraphBlock({
    name: 'Clock Input',
    svg: 'assets/svg/source/clock.svg',
    description: '',
    anchors: ANCHORS_SQUARE,
})
export class ClockInputDeclaration extends ASTNode {
    @EditorField({ label: 'variable name' })
    varName: string = '';

    getOutput() {
        return this.varName;
    }
}
