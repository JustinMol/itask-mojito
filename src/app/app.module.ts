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
import { MenuPanelComponent } from './menu/menu-panel.component';
import { MenuAccordionDirective } from './menu/menu-accordion.directive';
import { OutlineComponent } from './outline/outline.component';
import { FormListComponent } from './form-list/form-list.component';
import { AdtListComponent } from './adt-list/adt-list.component';
import { GraphBlocksComponent } from './graph-blocks/graph-blocks.component';
import { GraphFrameComponent } from './graph-frame/graph-frame.component';
import { GraphBlockComponent } from './graph-block/graph-block.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CodeFrameComponent,
    MonacoEditorDirective,
    MenuPanelComponent,
    MenuAccordionDirective,
    OutlineComponent,
    FormListComponent,
    AdtListComponent,
    GraphBlocksComponent,
    GraphFrameComponent,
    GraphBlockComponent,
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
