import { Edge } from './edge';
import { OptionDeclaration } from '../data-type/option-type';
import { ASTNode } from '../ast-node/ast-node';

export class OptionEdge extends Edge {
    option: boolean | OptionDeclaration;

    constructor(from: ASTNode, to: ASTNode, option: boolean | OptionDeclaration) {
        super(from, to);
        this.option = option;
    }
}
