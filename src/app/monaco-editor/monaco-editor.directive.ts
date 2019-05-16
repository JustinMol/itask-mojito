import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MonacoEditorService } from './monaco-editor.service';

@Directive({
  selector: 'app-monaco-editor'
})
export class MonacoEditorDirective implements OnInit, OnDestroy {

  constructor(
    private monaco: MonacoEditorService,
    private elem: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.monaco.loadEditor(this.elem, {
      theme: 'vs-dark',
      language: 'typescript',
      minimap: { enabled: false },
      automaticLayout: true,
    }).subscribe();
  }

  ngOnDestroy(): void {
    this.monaco.destroy();
  }
}
