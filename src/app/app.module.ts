import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ResizableModule } from 'angular-resizable-element';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CodeFrameComponent } from './code-frame/code-frame.component';
import { MonacoEditorDirective } from './monaco-editor.directive';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CodeFrameComponent,
    MonacoEditorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResizableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
