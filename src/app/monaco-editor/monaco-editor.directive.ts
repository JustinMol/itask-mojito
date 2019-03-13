import { Directive, OnInit, ElementRef, HostListener } from '@angular/core';
import { MonacoEditorService } from './monaco-editor.service';

@Directive({
  selector: 'app-monaco-editor'
})
export class MonacoEditorDirective implements OnInit {

  constructor(
    private monacoEditorService: MonacoEditorService,
    private elementRef: ElementRef
  ) { }

  @HostListener('window:resize')
  windowResized() {
    this.monacoEditorService.notifyResize();
  }

  ngOnInit() {
    this.monacoEditorService.loadEditor(this.elementRef, {
      theme: 'vs-dark',
      language: 'typescript',
      minimap: { enabled: false },
    }).subscribe();

    this.monacoEditorService.resize$.subscribe(() => this.monacoEditorService.editor.layout({
      width: this.elementRef.nativeElement.clientWidth,
      height: this.elementRef.nativeElement.clientHeight
    }));
  }
}
