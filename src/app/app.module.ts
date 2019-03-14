import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ResizableModule } from 'angular-resizable-element';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CodeFrameComponent } from './code-frame/code-frame.component';
import { MonacoEditorDirective } from './monaco-editor/monaco-editor.directive';
import { MenuPanelComponent } from './menu/menu-panel.component';
import { MenuAccordionDirective } from './menu/menu-accordion.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CodeFrameComponent,
    MonacoEditorDirective,
    MenuPanelComponent,
    MenuAccordionDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResizableModule,
    HttpClientModule,
    AngularSvgIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
