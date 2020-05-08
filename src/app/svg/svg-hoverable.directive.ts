import { Directive, ElementRef, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';

@Directive({
  selector: '[svg-hoverable]'
})
export class SvgHoverableDirective implements AfterViewInit, OnDestroy {

  private svg: any;

  @Input() scale: number = 1.1;
  @Input() useTransform: boolean = true;
  
  private width: number;
  private height: number;

  constructor(
    private el: ElementRef<Element>
  ) {}

  ngAfterViewInit(): void {
    this.svg = SVG(this.el.nativeElement)
      .on('dragmove.namespace', () => this.unfocus())
      .on('mouseover', () => this.focus())
      .on('mouseleave', () => this.unfocus());

    this.width = this.svg.width();
    this.height = this.svg.height();
  }

  ngOnDestroy(): void {
    this.svg
      .off('dragmove.namespace')
      .off('mouseover')
      .off('mouseleave');
  }

  private focus() {
    if (this.useTransform) {
      return this.svg.transform({
        scale: this.scale,
      });
    }

    const newWidth = this.width * this.scale;
    this.svg.width(newWidth);
    const newHeight = this.height * this.scale;
    this.svg.height(newHeight);
  }

  private unfocus() {
    if (this.useTransform) {
      return this.svg.transform({
        scale: 1,
      });
    }

    this.svg.width(this.width);
    this.svg.height(this.height);
  }

}
