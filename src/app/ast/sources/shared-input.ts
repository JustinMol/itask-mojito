import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DataType } from '../data-type/data-type';
import { ANCHORS, ASTNode } from '../ast-node/ast-node';

@SimpleEditor
@GraphBlock({
    name: 'Shared Input',
    svg: 'assets/svg/source/shared.svg',
    description: 'Ask the user to fill in a form of a chosen type. The information is automatically shared with other users.',
    anchors: ANCHORS,
})
export class SharedInputDeclaration extends ASTNode {
    @EditorField('variable name') varName: string = '';
    @EditorField() message: string = '';
    @EditorField() type: DataType = null;
    @EditorField() multiple: boolean = false;
}
