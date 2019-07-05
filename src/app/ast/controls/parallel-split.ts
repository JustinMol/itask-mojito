import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';

@GraphBlock({
    name: 'Parallel Split',
    svg: 'assets/svg/control/parallel-split.svg',
    description: '',
    anchors: DEFAULT_ANCHORS,
})
export class SplitControlDeclaration extends ASTNode {}
