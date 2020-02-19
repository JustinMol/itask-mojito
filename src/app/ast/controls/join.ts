import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';

@GraphBlock({
    name: 'Join',
    svg: 'assets/svg/control/join.svg',
    description: 'Join two workflow paths together. This block does not require configuration.',
    anchors: DEFAULT_ANCHORS,
})
export class JoinControlDeclaration extends ASTNode {}
