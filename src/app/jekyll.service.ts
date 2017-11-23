import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import * as path from 'path';
import * as cp from 'child_process';

@Injectable()
export class JekyllService {
  private jekyll : cp.ChildProcess;
  private hyde : cp.ChildProcess;
  private subject = new Subject<any>();

  constructor() {}

  runJekyll(path) {
    let command = 'cd '+path+' && jekyll serve';
    this.jekyll = cp.exec(command);
    return this.jekyll;
  }

  // Fix me : Need error exception for running error
  runHyde(path) {
    // Fix me : Dr.Hyde path have to be under dist. Not on the project path.
    // So it must be like
    // cd path && . venv/bin/activate && python manage.py runserver
    let command = 'cd '+ path +' && cd ../Dr.Hyde && . venv/bin/activate && python manage.py runserver';

    this.hyde = cp.exec(command);
    
    return this.hyde;
  }

  passHydeProcess(ps){
    this.subject.next(ps);
  }

  passJekyllProcess(ps){
    this.subject.next(ps);
  }

  getJekyll(){
    return this.jekyll;
  }

  getHyde(){
    return this.hyde;
  }

  getJekyllProcess(): Observable<any> {
    console.log('observable:');
    console.log(this.subject.asObservable());
    console.log(this.jekyll);
    return this.subject.asObservable();
  }
}