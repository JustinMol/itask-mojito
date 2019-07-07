import { Injectable, ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';
import { EditorType, getEditorType, getFieldOptions } from './editor-decorator';
import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { EditorComponent } from './editor-component';
import { TableEditorComponent } from './table-editor/table-editor.component';
import { ConditionEditorComponent } from './condition-editor/condition-editor.component';
import { ASTNode } from '../ast/ast-node/ast-node';

import { DataType } from '../ast/data-type/data-type';
import { DataTypeService } from '../data-type.service';
import { of, Observable } from 'rxjs';
import { TaskDeclaration } from '../ast/task/task-declaration';
import { TaskService } from '../task/task.service';
import { Variable } from '../ast/values/variable';
import { map } from 'rxjs/operators';
import { SelectOption } from './field-input/field-input.component';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _editorMap = new Map<EditorType,Type<EditorComponent>>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dataTypes: DataTypeService,
    private tasks: TaskService
  ) {
    this._editorMap.set(EditorType.SimpleEditor, SimpleEditorComponent);
    this._editorMap.set(EditorType.TableEditor, TableEditorComponent);
    this._editorMap.set(EditorType.ConditionEditor, ConditionEditorComponent);
  }

  public createEditorFactory(target: any): ComponentFactory<EditorComponent> {
    const Class = target.constructor ? target.constructor : target;
    const editorType = getEditorType(Class);
    if (this._editorMap.has(editorType)) {
      const component = this._editorMap.get(editorType);
      return this.componentFactoryResolver.resolveComponentFactory(component);
    }

    return null;
  }

  public initializeEditor(component: EditorComponent, node: ASTNode) {
    component.node = node;
    component.fields = getFieldOptions(node);
  }

  public getOptions(type: any): Observable<SelectOption[]> {
    switch (type) {
      case DataType:
        return this.dataTypes.getAll();
      case 'TaskDeclaration':
        return this.tasks.getAll().pipe(map(ts => ts.map(t => ({
          id: t.id,
          name: t.name,
          equals(other): boolean {
            if (!other) return false;
            return (other as any).id === t.id;
          }
        }))));
      case Variable:
        
      default:
        return of([]);
    }
  }
}
