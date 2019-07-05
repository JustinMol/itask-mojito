import { Injectable } from '@angular/core';
import { ASTService } from '../ast/ast.service';
import { GraphBlockOptions } from './graph-block/graph-block.decorator';
import { ASTNode } from '../ast/ast-node/ast-node';
import { JoinControlDeclaration } from '../ast/controls/join';
import { DecisionControlDeclaration } from '../ast/controls/decision';
import { Coordinates } from '../ast/ast-node/coordinates';
import { SequenceEdge } from '../ast/task/sequence-edge';
import { Edge } from '../ast/task/edge';

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

  deleteNode(node: ASTNode) {
    return this.ast.removeNode(node);
  }

  moveNode(node: ASTNode, coordinates: Coordinates): void {
    node.setCoordinates(coordinates);
    this.ast.save();
  }

  createEdge(from: ASTNode, to: ASTNode) {
    const edge = new SequenceEdge(from, to);
    this.ast.addEdge(edge);
  }

  deleteEdge(edge: Edge) {
    this.ast.removeEdge(edge);
  }

  canSendEdge(node: ASTNode) {
    const edges = this.getOutgoingEdges(node);
    return edges.length < this.getOutgoingEdgeLimit(node);
  }

  /**
   * An edge between `from` and `to` can be created if:
   * - `from` does not equal `to`
   * - the incoming edge limit of `to` has not been reached
   * - `to` does not exist in any path going into `from`
   */
  canCreateEdge(from: ASTNode, to: ASTNode): boolean {
    if (from.equals(to)) {
      return false;
    }

    const edges = this.getIncomingEdges(to);
    if (edges.length >= this.getIncomingEdgeLimit(to)) {
      return false;
    }

    const paths = this.getIncomingPaths(from);
    return !paths.some(p => p.find(n => n.equals(to)) != null);
  }

  getIncomingPaths(node: ASTNode): ASTNode[][] {
    const edges = this.getIncomingEdges(node);
    if (edges.length === 0) {
      return [[node]];
    }
    
    let paths = [];
    for (const edge of edges) {
      const ps = this.getIncomingPaths(edge.from);
      ps.forEach(p => p.push(node));
      paths = paths.concat(ps);
    }

    return paths;
  }

  private getIncomingEdges(node: ASTNode) {
    return this.ast
      .getEdges()
      .filter(e => e.to.equals(node));
  }

  private getOutgoingEdges(node: ASTNode) {
    return this.ast
      .getEdges()
      .filter(e => e.from.equals(node));
  }

  private getIncomingEdgeLimit(node: ASTNode) {
    if (node instanceof JoinControlDeclaration) {
      return Number.POSITIVE_INFINITY;
    }

    return 1;
  }

  private getOutgoingEdgeLimit(node: ASTNode) {
    if (node instanceof DecisionControlDeclaration) {
      return Number.POSITIVE_INFINITY;
    }

    return 1;
  }
}
