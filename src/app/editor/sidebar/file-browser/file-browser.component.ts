import { Component, OnInit, ElementRef, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TreeComponent } from 'angular-tree-component';
import * as fs from 'fs';
import * as path from 'path';

@Component({
  selector: 'side-content',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})

export class FileBrowserComponent implements OnInit {
  errorMessage: string;
  result: Boolean;
  nodes = [];
  index: number = 0;

  icon_newFile = 'assets/images/icon/icon_newFile.svg';
  icon_newDirectory = 'assets/images/icon/icon_newDirectory.svg';
  icon_refresh = 'assets/images/icon/icon_refresh.svg';
  icon_delete = 'assets/images/icon/icon_delete.svg';

  constructor (
    private router: Router,
    private elementRef: ElementRef 
  ) {};

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  ngOnInit(){
    this.makeDirectoryTree('./src/jekyll/bundle-site', (err, res)=>{
      console.log(res);
      this.nodes = res;
      this.tree.treeModel.update();
      //this.nodes = [JSON.stringify(res)];
    });
  };

  ngAfterViewInit(){
    //this.nodes = [this.tree];
  }

  private makeDirectoryTree = (dir:string, funcDone) => {
    let res = [];

    fs.readdir(dir, (err,files)=> {
      'use strict';
      if (err) throw err;

      let isEmpty = files.length;
      
      if (!isEmpty) {
        return;
      }

      for (let file of files) {
        file = path.resolve(dir, file);
        fs.stat(file, (err, stats)=> {
          if (stats && stats.isDirectory()) {
            this.makeDirectoryTree(file, (err, result)=>{
              res.push({
                id: this.index++,
                name: path.basename(file),
                type: 'folder',
                children: result
              });
              if (!--isEmpty)
                funcDone(null, res);
            });
          } else {
            let basename = path.basename(file);
            let MD_FORMAT = '\\.(markdown|md)$';
            if(new RegExp(MD_FORMAT,'i').test(basename)){
              res.push({
                id: this.index++,
                name: path.basename(file),
                type: 'file'
              });
            }
            if (!--isEmpty)
              funcDone(null, res);
          }
        });
      }
    });
  };

  private makeNode(stats) {
    if(stats.isDirectory()) {
      //return this.makeElements();
    } else {
      //return this.makeElements();
    }
  }

  private makeElement( content:string ) {
    let tmpContainer = document.createElement('div');
    tmpContainer.innerText = content;
    return tmpContainer;
  }
}