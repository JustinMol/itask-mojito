import { Directive, ElementRef, OnInit, OnDestroy, Input, Renderer2, Output, EventEmitter, HostBinding } from '@angular/core';
import { SkyhookDndService, DragSource, DragSourceMonitor } from '@angular-skyhook/core';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective implements OnInit, OnDestroy {

  @Input() dragType: string;
  @Input() dragValue: any;

  @HostBinding('class.dragging') dragging: boolean;
  
  private dragSource: DragSource<any, any>;

  constructor(
    private el: ElementRef<HTMLElement>,
    private dnd: SkyhookDndService
  ) {}

  ngOnInit(): void {
    this.dnd.dragLayer()
    this.dragSource = this.dnd.dragSource(this.dragType, {
      beginDrag: () => this.dragValue,
    });

    this.dragSource.connectDragSource(this.el.nativeElement);
    this.dragSource
      .listen(m => m.isDragging())
      .subscribe(b => this.dragging = b);
  }

  ngOnDestroy(): void {
    this.dragSource.unsubscribe();
  }

}
