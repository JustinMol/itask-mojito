import { Injectable, ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';
import { EditorType, getEditorType } from './editor-decorator';
import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { EditorComponent } from './editor-component';

@Injectable({
  providedIn: 'root'
})
export class EditorFactoryResolver {

  private _editorMap = new Map<EditorType,Type<EditorComponent>>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this._editorMap.set(EditorType.SimpleEditor, SimpleEditorComponent);
  }

  createEditorFactory(target: any): ComponentFactory<EditorComponent> {
    const Class = target.constructor ? target.constructor : target;
    const editorType = getEditorType(Class);
    if (this._editorMap.has(editorType)) {
      const component = this._editorMap.get(editorType);
      return this.componentFactoryResolver.resolveComponentFactory(component);
    }

    return null;
  }
}
