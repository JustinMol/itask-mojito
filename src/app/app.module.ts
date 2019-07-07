import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ResizableModule } from 'angular-resizable-element';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SkyhookDndModule } from '@angular-skyhook/core';
import { default as HTML5Backend } from 'react-dnd-html5-backend';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CodeFrameComponent } from './code-frame/code-frame.component';
import { MonacoEditorDirective } from './monaco-editor/monaco-editor.directive';
import { MenuPanelComponent } from './menu/menu-panel/menu-panel.component';
import { MenuAccordionComponent } from './menu/menu-accordion/menu-accordion.component';
import { GraphBlockListComponent } from './graph/graph-block-list/graph-block-list.component';
import { GraphFrameComponent } from './graph/graph-frame/graph-frame.component';
import { GraphBlockIconComponent } from './graph/graph-block-icon/graph-block-icon.component';
import { DroppableDirective } from './dnd/droppable.directive';
import { DropTargetDirective } from './dnd/drop-target.directive';
import { GraphNodeDirective } from './graph/graph-node/graph-node.directive';
import { TaskComponent } from './task/task.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GraphNodeEditorComponent } from './editors/graph-node-editor/graph-node-editor.component';
import { SimpleEditorComponent } from './editors/simple-editor/simple-editor.component';
import { EditorHostDirective } from './editors/editor-host.directive';
import { OutlineComponent } from './menu/outline/outline.component';
import { TableEditorComponent } from './editors/table-editor/table-editor.component';
import { RecordTypeEditorComponent } from './editors/record-type-editor/record-type-editor.component';
import { OptionTypeEditorComponent } from './editors/option-type-editor/option-type-editor.component';
import { GraphEdgeDirective } from './graph/graph-edge/graph-edge.directive';
import { SvgHoverableDirective } from './svg/svg-hoverable.directive';
import { ConditionEditorComponent } from './editors/condition-editor/condition-editor.component';
import { FieldInputComponent } from './editors/field-input/field-input.component';
import { GraphNodeConnectorComponent } from './graph/graph-node-connector/graph-node-connector.component';
import { GraphNodeOutputComponent } from './graph/graph-node-output/graph-node-output.component';
import { TaskOutputComponent } from './graph/task-output/task-output.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CodeFrameComponent,
    MonacoEditorDirective,
    MenuPanelComponent,
    MenuAccordionComponent,
    GraphBlockListComponent,
    GraphFrameComponent,
    GraphBlockIconComponent,
    DroppableDirective,
    DropTargetDirective,
    GraphNodeDirective,
    TaskComponent,
    WelcomeComponent,
    TopbarComponent,
    GraphNodeEditorComponent,
    SimpleEditorComponent,
    EditorHostDirective,
    OutlineComponent,
    TableEditorComponent,
    RecordTypeEditorComponent,
    OptionTypeEditorComponent,
    GraphEdgeDirective,
    SvgHoverableDirective,
    ConditionEditorComponent,
    FieldInputComponent,
    GraphNodeConnectorComponent,
    GraphNodeOutputComponent,
    TaskOutputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ResizableModule,
    HttpClientModule,
    AngularSvgIconModule,
    NgScrollbarModule,
    SkyhookDndModule.forRoot({ backend: HTML5Backend }),
    LocalStorageModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SimpleEditorComponent,
    TableEditorComponent,
    ConditionEditorComponent,
  ]
})
export class AppModule { }
