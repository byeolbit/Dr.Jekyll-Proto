import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var electron: any;

@Component({
  selector: 'app-root',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  errorMessage: string;
  result: Boolean;

  constructor (
    private router: Router
  ) {};

  ngOnInit() { 
    electron.remote.getCurrentWindow().setSize(1000,500,true);
  };
}