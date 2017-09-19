import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remote } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
  errorMessage: string;
  result: Boolean;

  icon_commit = 'assets/images/icon/icon_commit.svg';
  icon_push = 'assets/images/icon/icon_push.svg';
  icon_pull = 'assets/images/icon/icon_pull.svg';
  icon_branch = 'assets/images/icon/icon_branch.svg';

  constructor (
    private router: Router
  ) {};

  ngOnInit() { 
    let win = remote.getCurrentWindow();
    win.setSize(1000,500,true);
    win.setMaximizable(true);
    win.setFullScreenable(true);
    win.setResizable(true);
    win.setVibrancy('dark');
  };
}