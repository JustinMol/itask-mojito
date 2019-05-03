import { Directive, Input, HostBinding, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SkyhookDndService, DropTarget, DropTargetMonitor } from '@angular-skyhook/core';

@Directive({
  selector: '[appDropTarget]'
})
export class DropTargetDirective implements OnInit, OnDestroy {

  @Input() dropType: string;

  @HostBinding('class.hover') hover: boolean;

  @Output() dropped: EventEmitter<DropTargetMonitor<any>> = new EventEmitter();

  private dropTarget: DropTarget<any, any>

  constructor(
    private el: ElementRef<HTMLElement>,
    private dnd: SkyhookDndService
  ) {}

  ngOnInit(): void {
    this.dropTarget = this.dnd.dropTarget(this.dropType, {
      drop: m => {
        this.dropped.emit(m);
      }
    });

    this.dropTarget.connectDropTarget(this.el.nativeElement);
    this.dropTarget
      .listen(m => m.canDrop() && m.isOver())
      .subscribe(b => this.hover = b);
  }

  ngOnDestroy(): void {
    this.dropTarget.unsubscribe();
  }

}
