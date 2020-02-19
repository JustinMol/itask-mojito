import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';
import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { DataType } from '../data-type/data-type';
import { DataTypeDiscriminator } from '../data-type/data-type-discriminator';
import { Type } from 'class-transformer';
import { Variable } from '../values/variable';

@SimpleEditor
@GraphBlock({
    name: 'Code Block',
    svg: 'assets/svg/transform/code.svg',
    description: 'Use this block if you need extra complexity using Clean code.',
    anchors: DEFAULT_ANCHORS,
})
export class CodeTransformDeclaration extends ASTNode {
    code: string = '';

    @EditorField({ label: 'variable name' }) varName: string = '';

    @Type(() => DataType, DataTypeDiscriminator)
    @EditorField({
        input: 'select',
        type: 'datatype',
    })
    type: DataType = new DataType();

    getOutput() {
        return new Variable(this.varName, this.type);
    }
}
