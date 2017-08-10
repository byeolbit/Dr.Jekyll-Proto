import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component'
import { AppRoutingModlue } from './app-routing.module'

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RepositoryComponent } from './repository/repository.component';
import { EditorComponent } from './editor/editor.component';
import { SafePipe } from './editor/safe.pipe';

import { Router } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModlue
  ],
  declarations: [
    AppComponent,
    EditorComponent,
    LoginComponent,
    SafePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router:Router) {  
  }
}
