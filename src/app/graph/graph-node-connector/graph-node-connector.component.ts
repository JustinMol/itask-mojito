import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphService } from '../graph.service';
import { ASTNode } from 'src/app/ast/ast-node/ast-node';
import { OptionDeclaration } from 'src/app/ast/data-type/option-type';
import { EdgeConnector } from 'src/app/ast/edge/edge-connector';

@Component({
  selector: '[graph-node-connector]',
  templateUrl: './graph-node-connector.component.html',
  styleUrls: ['./graph-node-connector.component.less']
})
export class GraphNodeConnectorComponent implements OnInit {

  @Input() node: ASTNode;
  @Output('buttonClick') buttonClick$ = new EventEmitter<boolean | OptionDeclaration>();

  edgeConnector: EdgeConnector;
  showOptions = false;
  options: (boolean | OptionDeclaration)[];
  math = Math;

  constructor(
    private graph: GraphService
  ) {}

  ngOnInit() {
    this.edgeConnector = this.node.getEdgeConnector();
  }

  onButtonClick(event: Event) {
    event.stopImmediatePropagation();
    if (this.edgeConnector.isSequence) {
      this.buttonClick$.emit();
    } else {
      this.initOptionButtons();
      this.showOptions = true;
    }
  }

  onOptionClick(event: Event, option: boolean | OptionDeclaration) {
    event.stopImmediatePropagation();
    this.buttonClick$.emit(option);
    this.showOptions = false;
    this.initOptionButtons();
  }

  private initOptionButtons() {
    if (!this.edgeConnector.isSequence) {
      const options = this.edgeConnector.options;
      const map = this.graph.getEdgeMap(this.node);
      this.options = options.filter(o => !map.has(o));
    }
  }

}
