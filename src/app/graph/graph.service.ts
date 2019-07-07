import { Injectable } from '@angular/core';
import { ASTService } from '../ast/ast.service';
import { GraphBlockOptions } from './graph-block/graph-block.decorator';
import { ASTNode } from '../ast/ast-node/ast-node';
import { JoinControlDeclaration } from '../ast/controls/join';
import { DecisionControlDeclaration } from '../ast/controls/decision';
import { Coordinates } from '../ast/ast-node/coordinates';
import { SequenceEdge } from '../ast/edge/sequence-edge';
import { Edge } from '../ast/edge/edge';
import { OptionDeclaration } from '../ast/data-type/option-type';
import { OptionEdge } from '../ast/edge/option-edge';
import { PatternMatchExpression } from '../ast/values/pattern-match-expression';
import { SelectOption } from '../editors/field-input/field-input.component';
import { Variable } from '../ast/values/variable';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
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

  createEdge(from: ASTNode, to: ASTNode, option: boolean | OptionDeclaration) {
    if (option != null) {
      this.ast.addEdge(new OptionEdge(from, to, option));
    } else {
      this.ast.addEdge(new SequenceEdge(from, to));
    }
  }

  deleteEdge(edge: Edge) {
    this.invalidatePathTo(edge.to);
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

  getVariablesInScope(node: ASTNode): (string | Variable)[] {
    const paths = this.getIncomingPaths(node);
    paths.map(p => p.pop());
    const vars: (string | Variable)[] = [];
    for (const p of paths) {
      for (const node of p) {
        const output = node.getOutput();
        if (!output || output === '') continue;

        if (output instanceof Variable) {
          if (output.isValid()) {
            vars.push(output);
          }
        } else {
          vars.push(output);
        }
      }
    }
    
    return vars;
  }

  invalidatePathTo(node: ASTNode) {
    const vars = this.getVariablesInScope(node);
    for (const input of node.getInputs()) {
      if (vars.includes(input)) continue;
      node.invalidateInput(input);
    }
  }

  getEdgeMap(node: ASTNode): Map<'sequence' | boolean | OptionDeclaration, Edge> {
    const edges = this.getOutgoingEdges(node);

    if (node instanceof DecisionControlDeclaration || node instanceof PatternMatchExpression) {
      return edges.reduce((map, e: OptionEdge) => map.set(e.option, e), new Map());
    }

    return edges.reduce((map, e: SequenceEdge) => map.set('sequence', e), new Map());
  }

  getIncomingEdges(node: ASTNode) {
    return this.ast
      .getEdges()
      .filter(e => e.to.equals(node));
  }

  getOutgoingEdges(node: ASTNode) {
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
    return node.getEdgeConnector().limit;
  }
}
