import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DataType } from '../data-type/data-type';
import { ASTNode, ANCHORS_SQUARE } from '../ast-node/ast-node';
import { Type } from 'class-transformer';
import { Variable } from '../values/variable';
import { ListType } from '../data-type/list-type';

@SimpleEditor
@GraphBlock({
    name: 'Shared Input',
    svg: 'assets/svg/source/shared.svg',
    description: 'Ask the user to fill in a form of a chosen type. The information is automatically shared with other users.',
    anchors: ANCHORS_SQUARE,
})
export class SharedInputDeclaration extends ASTNode {
    @EditorField({ label: 'variable name' }) varName: string = '';
    @EditorField() message: string = '';
    @Type(() => DataType)
    @EditorField({
        input: 'select',
        type: 'datatype',
    }) type: DataType = new DataType();

    @EditorField({
        input: 'checkbox',
    }) multiple: boolean = false;

    getOutput() {
        const type = this.multiple ? new ListType(this.type) : this.type;
        return new Variable(this.varName, type);
    }
}
