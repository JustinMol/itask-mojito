import { Injectable } from '@angular/core';
import { ASTService } from '../ast/ast.service';
import { Coordinates, ASTNode } from '../ast/ast';
import { GraphBlockOptions } from './graph-block/graph-block.decorator';

@Injectable()
export class GraphService {

  constructor(
    private ast: ASTService
  ) {}

  createNode({ NodeType }: GraphBlockOptions, coordinates: Coordinates): ASTNode {
    const node = new NodeType();
    node.setCoordinates(coordinates);
    this.ast.addNode(node);
    return node;
  }

  moveNode(node: ASTNode, coordinates: Coordinates): void {
    node.setCoordinates(coordinates);
    this.ast.save();
  }
}
