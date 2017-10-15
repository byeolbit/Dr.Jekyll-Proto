import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from './provider/repository.service'
import { Repository } from './repository'
import { remote } from 'electron';

import { JekyllService } from '../jekyll.service'

import * as cp from 'child_process';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'repository',  
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  providers: [RepositoryService]
})

export class RepositoryComponent implements OnInit{
  @Input() ps;
  
  repoList: Repository[];
  icon_repo = 'assets/images/icon/icon_repo.png';
  repositorySrc;

  constructor (
    private router: Router,
    private repositoryService: RepositoryService,
    private jekyllService: JekyllService
  ) {}

  ngOnInit() {
    let win = remote.getCurrentWindow();
    win.setFullScreenable(false);
    win.setMaximizable(false);
    win.setSize(780,480,true);
    this.repositoryService.getRepositories()
                          .then(repository => {
                            this.repoList = repository;
                          });
  }

  loadRepository() {
    let openProject = this.selectDirectory(this.jekyllService);
    
    openProject.then(this.runJekyll)
               .then(result => this.navigateToEditor(result));
  }

  private selectDirectory(service) {
    return new Promise((resolve, rejected)=>{
      let dialog = remote.dialog;
      resolve({
        path: dialog.showOpenDialog({properties: ['openDirectory']}).toString(),
        service: service
      })
    });
  }
  
  private runJekyll(recived) {
    return new Promise ((resolve, rejected)=>{
      let child = recived.service.runJekyll(recived.path);

      child.stdout.on('data', data => {
        if(data.toString().indexOf('Server running...') !== -1){
          resolve({child: child, path: recived.path, success:true});
        }
      })
    });
  }

  private navigateToEditor(result) {
    if (result.success) {
      this.router.navigate(['/editor',{'src' : result.path }]);
      this.jekyllService.passJekyllProcess(result.child);
    }
  }
}