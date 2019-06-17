import { Directive, ViewContainerRef, OnChanges, SimpleChanges, Input } from '@angular/core';
import { EditorFactoryResolver } from './editor.service';
import { ASTNode } from '../ast/ast';


@Directive({
  selector: '[editor-host]'
})
export class EditorHostDirective implements OnChanges {

  @Input() node: ASTNode;

  constructor(
    private editorFactoryResolver: EditorFactoryResolver,
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

    const factory = this.editorFactoryResolver.createEditorFactory(this.node);
    if (!factory) {
      return;
    }

    const componentRef = this.viewContainerRef.createComponent(factory);
    componentRef.instance.node = this.node;
  }
}
