import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SideBarComponent implements OnInit {
  errorMessage: string;
  result: Boolean;

  icon_fileBrowser = 'assets/images/icon/icon_fileBrowser.svg';
  icon_branchBrowser = 'assets/images/icon/icon_branchBrowser.svg';

  constructor (
    private router: Router
  ) {};

  ngOnInit(){
  };
}