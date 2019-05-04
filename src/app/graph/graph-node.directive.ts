import { Directive, Input, ElementRef, OnInit } from '@angular/core';

declare const SVG: any;

@Directive({
  selector: '[graphNode]'
})
export class GraphNodeDirective implements OnInit {

  @Input('graphNode') node;

  private elem;

  constructor(
    private el: ElementRef<Element>
  ) {}

  ngOnInit(): void {
    this.elem = SVG.adopt(this.el.nativeElement);
    this.elem.attr({
      href: this.node.block.svg,
    });
  }

}
