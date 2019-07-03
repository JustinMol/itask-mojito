import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { ANCHORS, ASTNode } from '../ast-node/ast-node';

@SimpleEditor
@GraphBlock({
    name: 'Clock Input',
    svg: 'assets/svg/source/clock.svg',
    description: '',
    anchors: ANCHORS,
})
export class ClockInputDeclaration extends ASTNode {
    @EditorField('variable name') varName: string = '';
}
