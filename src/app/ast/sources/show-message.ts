import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { ASTNode, ANCHORS_SQUARE } from '../ast-node/ast-node';

@SimpleEditor
@GraphBlock({
    name: 'Show Message',
    svg: 'assets/svg/source/show-message.svg',
    description: 'Show a message to the user.',
    anchors: ANCHORS_SQUARE
})
export class ShowMessageDeclaration extends ASTNode {
    @EditorField() message: string = '';
}
