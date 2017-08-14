import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'live-editor',
  templateUrl: './live-editor.component.html',
  styleUrls: ['./live-editor.component.css']
})

export class LiveEditorComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  title = 'Hello Dr.Jekyll';
  iframeDoc;
  iframeCont;

  toolboxL = 'assets/images/toolbox_l.png';
  toolboxR = 'assets/images/toolbox_r.png';
  toolbox_bold = 'assets/images/bold.png';
  toolbox_heading = 'assets/images/heading.png';

  constructor ( private router: Router ){};

  ngOnInit(){};

  onLoad() {
    let doc = this.iframe.nativeElement.contentDocument || 
              this.iframe.nativeElement.contentWindow.document;
    this.iframeDoc = doc;
    let cont = <HTMLElement>doc.getElementsByClassName('post-content')[0];
    this.iframeCont = cont;
    cont.contentEditable = 'true';
  }
  bold() {
    this.iframeDoc.execCommand('bold',false, '');
  }
  heading1() {
    this.iframeDoc.execCommand('formatBlock',false,'<h1>');
  }
  makeBodyToJson() {
    let bodyCont = [].map.call(this.iframeCont.children, node =>{
      return node.outerHTML;
    }).join('');
    let json = JSON.stringify({body : bodyCont});
    console.log(json);
  }
}
