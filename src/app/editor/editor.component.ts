import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  title = 'Hello Dr.Jekyll';
  iframeDoc;
  iframeCont;

  constructor (private router: Router){};

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
    let bodyCont = [].map.call(this.iframeCont.children,(node)=>{
      let b = node.outerHTML;
      if (b[1].toLowerCase()==='h') {
        b = '<p>'+b+'</p>';
      }
      return b;
    }).join('');
    let json = JSON.stringify({body : bodyCont});
    console.log(json);
  }
}
