import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';
import { EdgeConnector } from '../edge/edge-connector';

@GraphBlock({
    name: 'Parallel Split',
    svg: 'assets/svg/control/parallel-split.svg',
    description: 'Split the workflow into two parallel paths. This block does not require configuration.',
    anchors: DEFAULT_ANCHORS,
})
export class SplitControlDeclaration extends ASTNode {
    getEdgeConnector() {
        return new EdgeConnector(true, Number.POSITIVE_INFINITY);
    }
}
