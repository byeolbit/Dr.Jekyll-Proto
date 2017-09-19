import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RepositoryComponent } from './repository/repository.component';
import { EditorComponent } from './editor/editor.component';
import { SideBarComponent } from './editor/sidebar/sidebar.component';
import { FileBrowserComponent } from './editor/sidebar/file-browser/file-browser.component'
import { LiveEditorComponent } from './editor/live-editor/live-editor.component';

import { TreeModule } from 'angular-tree-component';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    TreeModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RepositoryComponent,
    EditorComponent,
    SideBarComponent,
    FileBrowserComponent,
    LiveEditorComponent,
    SafePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router:Router) {  
  }
}
