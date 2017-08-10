import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './user'

import 'rxjs/add/operator/toPromise';

declare var electron: any;

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  providers: [ LoginService ],
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorMessage: string;
  result: Boolean;

  constructor (
    private loginService: LoginService,
    private router: Router
  ) {};

  ngOnInit() { 
    electron.remote.getCurrentWindow().setSize(1000,500,true);
  };

  login(user:User) {
    this.loginService.requestLogin(user)
                     .then(r => {
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
      this.router.navigate(['/editor']);
    }
  }
}