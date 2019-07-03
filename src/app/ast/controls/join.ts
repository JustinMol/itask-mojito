import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { ANCHORS, ASTNode } from '../ast-node/ast-node';

@GraphBlock({
    name: 'Join',
    svg: 'assets/svg/control/join.svg',
    description: '',
    anchors: ANCHORS,
})
export class JoinControlDeclaration extends ASTNode {}
