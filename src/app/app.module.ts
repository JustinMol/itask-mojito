import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ResizableModule } from 'angular-resizable-element';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SkyhookDndModule } from '@angular-skyhook/core';
import { default as HTML5Backend } from 'react-dnd-html5-backend';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CodeFrameComponent } from './code-frame/code-frame.component';
import { MonacoEditorDirective } from './monaco-editor/monaco-editor.directive';
import { MenuPanelComponent } from './menu/menu-panel/menu-panel.component';
import { MenuAccordionComponent } from './menu/menu-accordion/menu-accordion.component';
import { OutlineComponent } from './outline/outline.component';
import { FormListComponent } from './form-list/form-list.component';
import { AdtListComponent } from './adt-list/adt-list.component';
import { GraphBlockListComponent } from './graph/graph-block-list/graph-block-list.component';
import { GraphFrameComponent } from './graph/graph-frame/graph-frame.component';
import { GraphBlockIconComponent } from './graph/graph-block-icon/graph-block-icon.component';
import { DroppableDirective } from './dnd/droppable.directive';
import { DropTargetDirective } from './dnd/drop-target.directive';
import { GraphNodeDirective } from './graph/graph-node.directive';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CodeFrameComponent,
    MonacoEditorDirective,
    MenuPanelComponent,
    MenuAccordionComponent,
    OutlineComponent,
    FormListComponent,
    AdtListComponent,
    GraphBlockListComponent,
    GraphFrameComponent,
    GraphBlockIconComponent,
    DroppableDirective,
    DropTargetDirective,
    GraphNodeDirective,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResizableModule,
    HttpClientModule,
    AngularSvgIconModule,
    NgScrollbarModule,
    SkyhookDndModule.forRoot({ backend: HTML5Backend }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
