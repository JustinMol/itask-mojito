import { ASTNode } from '../ast-node/ast-node';
import { Type } from 'class-transformer';
import { NodeDiscriminator } from '../ast-node/node-discriminator';

export class Edge {
    @Type(() => ASTNode, NodeDiscriminator)
    public from: ASTNode;

    @Type(() => ASTNode, NodeDiscriminator)
    public to: ASTNode;

    constructor(from: ASTNode, to: ASTNode) {
        this.from = from;
        this.to = to;
    }
}
