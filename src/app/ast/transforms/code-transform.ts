import { GraphBlock } from 'src/app/graph/graph-block/graph-block.decorator';
import { DEFAULT_ANCHORS, ASTNode } from '../ast-node/ast-node';

@GraphBlock({
    name: 'Code Block',
    svg: 'assets/svg/transform/code.svg',
    description: '',
    anchors: DEFAULT_ANCHORS,
})
export class CodeTransformDeclaration extends ASTNode {
    code: string = '';
}
