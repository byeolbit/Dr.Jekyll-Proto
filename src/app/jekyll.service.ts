import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import * as cp from 'child_process';

@Injectable()
export class JekyllService {
  private jekyll : cp.ChildProcess;
  private subject = new Subject<any>();

  constructor() {}

  runJekyll(path) {
    let command = 'cd '+path+' && jekyll serve';
    this.jekyll = cp.exec(command);
    return this.jekyll;
  }

  passJekyllProcess(ps){
    this.subject.next(ps);
  }

  getJekyll(){
    return this.jekyll;
  }

  getJekyllProcess(): Observable<any> {
    console.log('observable:');
    console.log(this.subject.asObservable());
    console.log(this.jekyll);
    return this.subject.asObservable();
  }
}