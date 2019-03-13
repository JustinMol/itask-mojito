import { Directive, OnInit, ElementRef, HostListener } from '@angular/core';
import { MonacoEditorService } from './monaco-editor.service';
import { Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Directive({
  selector: 'app-monaco-editor'
})
export class MonacoEditorDirective implements OnInit {

  private resize$ = new Subject();

  constructor(
    private monacoEditorService: MonacoEditorService,
    private elementRef: ElementRef
  ) { }

  @HostListener('window:resize')
  onResize() {
    this.resize$.next();
  }

  ngOnInit() {
    this.monacoEditorService.loadEditor(this.elementRef, {
      theme: 'vs-dark',
      language: 'typescript',
      minimap: { enabled: false },
    }).subscribe();

    this.resize$.pipe(
      map(() => ({ width: this.elementRef.nativeElement.clientWidth, height: this.elementRef.nativeElement.clientHeight })),
      debounceTime(50)
    ).subscribe(dimension => this.monacoEditorService.editor.layout(dimension))
  }
}
