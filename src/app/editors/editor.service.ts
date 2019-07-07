import { Injectable, ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';
import { EditorType, getEditorType, getFieldOptions, EditorFieldOptions } from './editor-decorator';
import { SimpleEditorComponent } from './simple-editor/simple-editor.component';
import { EditorComponent } from './editor-component';
import { TableEditorComponent } from './table-editor/table-editor.component';
import { ConditionEditorComponent } from './condition-editor/condition-editor.component';
import { ASTNode } from '../ast/ast-node/ast-node';
import { flatten } from 'lodash';

import { DataTypeService } from '../data-type.service';
import { of, Observable } from 'rxjs';
import { TaskService } from '../task/task.service';
import { Variable } from '../ast/values/variable';
import { map } from 'rxjs/operators';
import { SelectOption } from './field-input/field-input.component';
import { GraphService } from '../graph/graph.service';
import { CONDITIONS } from '../ast/values/condition';
import { TaskDeclaration } from '../ast/task/task-declaration';
import { RecordTypeDeclaration } from '../ast/data-type/record-type';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  private _editorMap = new Map<EditorType,Type<EditorComponent>>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dataTypes: DataTypeService,
    private tasks: TaskService,
    private graph: GraphService
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

  public getOptions(field: EditorFieldOptions, node: ASTNode): Observable<SelectOption[]> {
    switch (field.type) {
      case 'datatype':
        return this.dataTypes.getAll();
      case 'task':
        return this.tasks.getAll().pipe(map(ts => {
          return flatten(ts.map(t => this.toSelectOptions(t)));
        }));
      case 'variable':
        const vars = this.graph.getVariablesInScope(node);
        const opts = vars.map(v => this.toSelectOptions(v));
        return of(flatten(opts));
      case 'condition':
        return of(CONDITIONS)
      default:
        return of([]);
    }
  }

  private toSelectOptions(v: TaskDeclaration | Variable | string): SelectOption[] {
    if (v instanceof Variable) {
      if (v.type instanceof RecordTypeDeclaration) {
        return [v, ...v.type.fields.map(f => ({
          name: v.name + '.' + f.property,
          equals(other) {
            if (!other) return false;
            return other.name === this.name;
          }
        }))];
      }

      return [v];
    }

    if (v instanceof TaskDeclaration) {
      return [v];
    }

    return [{
      name: v,
      equals(other): boolean {
        if (!other) return false;
        return other.name === v;
      }
    }]
  }
}
