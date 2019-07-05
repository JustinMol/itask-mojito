import { Directive, ViewContainerRef, OnChanges, SimpleChanges, Input } from '@angular/core';
import { EditorService } from './editor.service';
import { ASTNode } from '../ast/ast-node/ast-node';

@Directive({
  selector: '[editor-host]'
})
export class EditorHostDirective implements OnChanges {

  @Input() node: ASTNode;

  constructor(
    private editorService: EditorService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.node) {
      return;
    }

    this.viewContainerRef.clear();
    if (!this.node) {
      return;
    }

    const factory = this.editorService.createEditorFactory(this.node);
    if (!factory) {
      return;
    }

    const componentRef = this.viewContainerRef.createComponent(factory);
    this.editorService.initializeEditor(componentRef.instance, this.node);
  }
}
