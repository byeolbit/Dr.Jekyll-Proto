import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from './provider/repository.service'
import { Repository } from './repository'
import { remote } from 'electron';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',  
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  providers: [RepositoryService]
})

export class RepositoryComponent implements OnInit{
  repoList: Repository[];
  icon_repo = 'assets/images/icon/icon_repo.png';
  repositorySrc;

  constructor (
    private router: Router,
    private repositoryService: RepositoryService
  ) {}

  ngOnInit() {
    let win = remote.getCurrentWindow();
    win.setFullScreenable(false);
    win.setMaximizable(false);
    win.setSize(780,480,true);
    this.repositoryService.getRepositories()
                          .then(repository => {
                            this.repoList = repository;
                            console.log(this.repoList);
                          })
  }

  loadRepository() {
    this.selectDirectory();
    this.navigateToEditor(true);
  }

  private navigateToEditor(result:Boolean) {
    if (result) {
      console.log(this.repositorySrc);
      this.router.navigate(['/editor',{'src' : this.repositorySrc }]);
    }
  }

  private selectDirectory() {
    let dialog = remote.dialog;
    this.repositorySrc = dialog.showOpenDialog({properties: ['openDirectory']}).toString();
  }
}