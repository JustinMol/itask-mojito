import { Injectable, ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';
import { EditorType, getEditorType, getFieldOptions, Field, EditorFieldOptions } from './editor-decorator';
import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { EditorComponent } from './editor-component';
import { TableEditorComponent } from './table-editor/table-editor.component';
import { ConditionEditorComponent } from './condition-editor/condition-editor.component';
import { ASTNode } from '../ast/ast-node/ast-node';

import { DataType } from '../ast/data-type/data-type';
import { DataTypeService } from '../data-type.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _editorMap = new Map<EditorType,Type<EditorComponent>>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dataTypes: DataTypeService
  ) {
    this._editorMap.set(EditorType.SimpleEditor, SimpleEditorComponent);
    this._editorMap.set(EditorType.TableEditor, TableEditorComponent);
    this._editorMap.set(EditorType.ConditionEditor, ConditionEditorComponent);
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

  initializeEditor(component: EditorComponent, node: ASTNode) {
    const fields = getFieldOptions(node);
    component.node = node;
    component.fields = component.fields || [];

    fields.forEach(field => {
      this.getOptions(field).subscribe(opts => {
        component.fields.push({
          property: field.property,
          value: node[field.property],
          options: opts,
          input: field.input,
          label: field.label,
          type: field.type,
        });
      });
    });
  }

  private getOptions(field: EditorFieldOptions): Observable<any[]> {
    switch (field.type) {
      case DataType:
        return this.dataTypes.getAll();
      default:
        return of([]);
    }
  }
}
