import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './user'
import { remote } from 'electron';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  providers: [ LoginService ],
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  errorMessage: string;
  result: Boolean;

  logo_jekyll = 'assets/images/Jekyll.png';
  icon_github = 'assets/images/icon/icon_GitHub.png';

  constructor (
    private loginService: LoginService,
    private router: Router
  ) {
  };

  ngOnInit() { 
    let win = remote.getCurrentWindow();
    win.setFullScreenable(false);
    win.setMaximizable(false);
    win.setSize(780,480,true);
    this.preventDragandDrop();
  };

  login(user:User) {
    this.loginService.requestLogin(user)
                     .then(r => {
                            console.log(r);
                            this.result = this.returnResult(r);
                            this.navigateToRepo(true);
                           },
                           error => this.errorMessage = <any>error);
  }

  private returnResult(data:{result:boolean}): Boolean {
    return data.result;
  }

  private navigateToRepo(result:Boolean) {
    if (result) {
      this.router.navigate(['/repository']);
    }
  }

  private preventDragandDrop() {
    document.addEventListener('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
    document.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
}