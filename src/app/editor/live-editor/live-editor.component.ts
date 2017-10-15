import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'live-editor',
  templateUrl: './live-editor.component.html',
  styleUrls: ['./live-editor.component.scss']
})

export class LiveEditorComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  @Input() mdDoc;
  @Input() dir;
  
  title = 'Hello Dr.Jekyll';
  iframeDoc;
  iframeCont;

  icon_editHeader = 'assets/images/icon/icon_editHeader.svg';
  icon_ol = 'assets/images/icon/icon_ol.svg';
  icon_ul = 'assets/images/icon/icon_ul.svg';
  icon_bold = 'assets/images/icon/icon_bold.svg';
  icon_heading = 'assets/images/icon/icon_heading.svg';
  icon_table = 'assets/images/icon/icon_table.svg';
  icon_deleteTable = 'assets/images/icon/icon_deleteTable.svg';
  icon_add = 'assets/images/icon/icon_add.svg';
  icon_image = 'assets/images/icon/icon_image.svg';
  icon_link = 'assets/images/icon/icon_link.svg';
  icon_quote = 'assets/images/icon/icon_quote.svg';
  icon_code = 'assets/images/icon/icon_code.svg';
  icon_checklist = 'assets/images/icon/icon_checklist.svg';
  icon_ssl = 'assets/images/icon/icon_ssh.svg';
  icon_information = 'assets/images/icon/icon_information.svg';
  icon_emoji = 'assets/images/icon/icon_emoji.svg';
  icon_strike = 'assets/images/icon/icon_strike.svg';
  icon_metion = 'assets/images/icon/icon_mention.svg';


  constructor ( private router: Router ){};

  ngOnInit(){};

  onLoad() {
    let doc = this.iframe.nativeElement.contentDocument || 
              this.iframe.nativeElement.contentWindow.document;
    this.iframeDoc = doc;
    let cont = <HTMLElement>doc.getElementsByClassName('post-content')[0];
    
    let baseHref = <HTMLElement>doc.createElement('base');
    baseHref.setAttribute('href',this.dir);
    doc.body.appendChild(baseHref);
    if (cont !== undefined) {
      cont.contentEditable = 'true';
    }

    let links = doc.getElementsByTagName('a');
    for (var index = 0; index < links.length; index++) {
      links[index].removeAttribute('href');
    }
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
