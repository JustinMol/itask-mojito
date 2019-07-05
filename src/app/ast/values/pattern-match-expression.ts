import { Variable } from './variable';
import { OptionTypeDeclaration } from '../data-type/option-type';
import { ASTNode, DEFAULT_ANCHORS } from '../ast-node/ast-node';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';

@SimpleEditor
@GraphBlock({
    name: 'Pattern Match',
    svg: 'assets/svg/control/pattern-match.svg',
    description: 'Make a decision by matching on the value of an option.',
    anchors: DEFAULT_ANCHORS,
})
export class PatternMatchExpression extends ASTNode {
    @EditorField()
    variable: Variable = null;

    get type(): OptionTypeDeclaration {
        const t = this.variable.type;
        if (t instanceof OptionTypeDeclaration) {
            return t;
        }

        throw new Error('Type of PatternMatch was not an OptionType: '+ t);
    }
}
