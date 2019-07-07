import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { ASTNode, ANCHORS_SQUARE } from '../ast-node/ast-node';
import { Variable } from '../values/variable';
import { ListType } from '../data-type/list-type';
import { Type } from 'class-transformer';

@SimpleEditor
@GraphBlock({
    name: 'User Select',
    svg: 'assets/svg/source/user-select.svg',
    description: 'Ask the user to choose from a list.',
    anchors: ANCHORS_SQUARE
})
export class UserSelectDeclaration extends ASTNode {
    @EditorField({ label: 'variable name' }) varName: string = '';

    @Type(() => Variable)
    @EditorField({
        type: 'variable',
        input: 'select',
        filter: (v: Variable) => v.type instanceof ListType
    })
    list: Variable = null;

    @EditorField() message: string = '';

    getOutput() {
        if (!this.list) return new Variable(this.varName, null);
        const listType = this.list.type as ListType;
        return new Variable(this.varName, listType.type);
    }

    getInputs() {
        return [this.list];
    }

    invalidateInput(input: Variable) {
        if (this.list === input) {
            this.list = null;
        }
    }
}
