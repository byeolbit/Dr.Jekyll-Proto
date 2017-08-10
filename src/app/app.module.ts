import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
//import { RepositoryComponent } from './repository/repository.component';
import { EditorComponent } from './editor/editor.component';
import { SafePipe } from './editor/safe.pipe';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { path: 'editor', component: EditorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LoginComponent,
    SafePipe,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  bootstrap: [LoginComponent]
})
export class AppModule { }
