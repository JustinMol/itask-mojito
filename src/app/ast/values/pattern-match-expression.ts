import { Variable } from './variable';
import { OptionTypeDeclaration } from '../data-type/option-type';
import { ASTNode, DEFAULT_ANCHORS } from '../ast-node/ast-node';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { SimpleEditor, EditorField } from 'src/app/editors/editor-decorator';
import { EdgeConnector } from '../edge/edge-connector';

@SimpleEditor
@GraphBlock({
    name: 'Pattern Match',
    svg: 'assets/svg/control/pattern-match.svg',
    description: 'Make a decision by matching on the value of an option.',
    anchors: DEFAULT_ANCHORS,
})
export class PatternMatchExpression extends ASTNode {
    @EditorField({
        type: 'variable',
        input: 'select',
        filter: (v: Variable) => v.type instanceof OptionTypeDeclaration
    })
    variable: Variable = null;

    get type(): OptionTypeDeclaration {
        if (this.variable === null) return null;

        const t = this.variable.type;
        if (t instanceof OptionTypeDeclaration) {
            return t;
        }

        throw new Error('Type of PatternMatch was not an OptionType: '+ t);
    }

    getEdgeConnector(): EdgeConnector {
        if (!this.variable || !this.variable.type) {
            return new EdgeConnector(false, 0, []);
        }

        const type = this.variable.type as OptionTypeDeclaration;
        const options = type.options.map(o => o.name);
        return new EdgeConnector(false, options.length, options);
    }
}
