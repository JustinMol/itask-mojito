import { ASTNode, ANCHORS_SQUARE } from '../ast-node/ast-node';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { DataType } from '../data-type/data-type';
import { DataTypeDiscriminator } from '../data-type/data-type-discriminator';
import { Type } from 'class-transformer';
import { Variable } from '../values/variable';
import { ListType } from '../data-type/list-type';

@SimpleEditor
@GraphBlock({
    svg: 'assets/svg/source/task-input.svg',
    description: 'Allows an input of the current task',
    name: 'Task Input',
    anchors: ANCHORS_SQUARE,
})
export class TaskInput extends ASTNode {
    @EditorField({ label: 'variable name' }) varName: string = '';

    @Type(() => DataType, DataTypeDiscriminator)
    @EditorField({
        input: 'select',
        type: 'datatype',
    })
    type: DataType = new DataType();

    @EditorField({
        input: 'checkbox',
    }) multiple: boolean = false;

    getOutput() {
        const type = this.multiple ? new ListType(this.type) : this.type;
        return new Variable(this.varName, type);
    }
}
