import { Directive, Input, Type, ViewContainerRef, ComponentFactoryResolver, OnChanges, SimpleChanges } from '@angular/core';


@Directive({
  selector: '[editor-host]'
})
export class EditorHostDirective implements OnChanges {

  @Input() component: Type<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.component) return;

    if (!this.component) {
      this.viewContainerRef.clear();
      return;
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(factory);
  }

}
