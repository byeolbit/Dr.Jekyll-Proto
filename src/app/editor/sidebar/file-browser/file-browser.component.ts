import { Component, OnInit, ElementRef, NgModule, ViewChild, Input } from '@angular/core';
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
  @Input() dir: string;
  
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
    this.makeDirectoryTree(this.dir, (err, res)=>{
      this.nodes = res;
      this.tree.treeModel.update();
    });
  };

  private makeDirectoryTree = (dir, funcDone) => {
    let res = [];

    fs.readdir(dir, (err,files)=> {
      if (err) throw err;

      let isEmpty = files.length;
      
      if (!isEmpty) {
        return;
      }

      for (let file of files) {
        file = path.resolve(dir, file);
        fs.stat(file, (err, stats)=> {
          if (stats && 
              stats.isDirectory() && 
              path.basename(file)[0]!=='.') {
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
            let MD_FORMAT = '\\.(MARKDOWN|MD|markdown|md)$';
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

  /**
   * TODO : Generate link to rendered html of md file
   * @param file 
   */
  private generateUrl(file) {
  }

  /**
   * TODO : Parser to parse header of md file
   * @param file
   */
  private mdHeaderParser(file) {
  }
}