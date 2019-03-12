import { Directive, OnInit, ElementRef } from '@angular/core';
import { MonacoEditorService } from './monaco-editor.service';

@Directive({
  selector: 'app-monaco-editor'
})
export class MonacoEditorDirective implements OnInit {

  constructor(
    private monacoEditorService: MonacoEditorService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.monacoEditorService.loadEditor(this.elementRef, {
      theme: 'vs-dark',
      language: 'typescript',
      minimap: { enabled: false },
    });
  }
}
