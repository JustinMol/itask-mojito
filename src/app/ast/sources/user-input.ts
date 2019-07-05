import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DataType } from '../data-type/data-type';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';
import { Type } from 'class-transformer';
import { DataTypeDiscriminator } from '../data-type/data-type-discriminator';

@SimpleEditor
@GraphBlock({
    name: 'User Input',
    svg: 'assets/svg/source/user.svg',
    description: 'Ask the user to fill in a form of a chosen type.',
    anchors: DEFAULT_ANCHORS
})
export class UserInputDeclaration extends ASTNode {
    @EditorField({ label: 'variable name' }) varName: string = '';
    @EditorField() message: string = '';

    @Type(opts => DataType, DataTypeDiscriminator)
    @EditorField({
        input: 'select',
        type: DataType,
    })
    type: DataType = null;

    // @EditorField() multiple: boolean = false;
}
