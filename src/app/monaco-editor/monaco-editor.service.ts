/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />
import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class MonacoEditorService {

  private monacoEditor: monaco.editor.ICodeEditor;

  constructor() { }

  public get editor() {
    return this.monacoEditor;
  }

  public loadEditor(elementRef: ElementRef, options?: monaco.editor.IEditorConstructionOptions): Observable<void> {
    return this.bootstrap$.pipe(
      tap(() => {
        this.monacoEditor = monaco.editor.create(elementRef.nativeElement, options);
      }));
  }

  private bootstrap$: Observable<void> = Observable.create(observer => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'libs/vs/loader.js';
    script.onload = () => {
      window.require.config({ paths: { vs: 'libs/vs' } });
      window.require(['vs/editor/editor.main'], () => {
        observer.next();
      });
    };

    document.head.appendChild(script);
  });
}
