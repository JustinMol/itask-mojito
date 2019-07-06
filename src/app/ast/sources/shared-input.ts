import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DataType } from '../data-type/data-type';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';
import { Type } from 'class-transformer';

@SimpleEditor
@GraphBlock({
    name: 'Shared Input',
    svg: 'assets/svg/source/shared.svg',
    description: 'Ask the user to fill in a form of a chosen type. The information is automatically shared with other users.',
    anchors: DEFAULT_ANCHORS,
})
export class SharedInputDeclaration extends ASTNode {
    @EditorField({ label: 'variable name' }) varName: string = '';
    @EditorField() message: string = '';
    @Type(() => DataType)
    @EditorField({
        input: 'select',
        type: DataType,
    }) type: DataType = new DataType();
    @EditorField() multiple: boolean = false;
}
