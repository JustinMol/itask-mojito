import { ConditionEditor } from 'src/app/editors/editor-decorator';
import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { Type } from 'class-transformer';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';
import { SimpleBooleanExpression } from '../values/boolean-expression';

@ConditionEditor
@GraphBlock({
    name: 'Decision',
    svg: 'assets/svg/control/choice.svg',
    description: 'Make a decision based on a task\'s value.',
    anchors: DEFAULT_ANCHORS,
})
export class DecisionControlDeclaration extends ASTNode {
    @Type(() => SimpleBooleanExpression)
    andExpressions: SimpleBooleanExpression[][] = [[new SimpleBooleanExpression()]];
}
