import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RepositoryComponent } from './repository/repository.component';
import { EditorComponent } from './editor/editor.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'editor', component: EditorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true
      }
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    
  ]
})

export class AppRoutingModlue {}