import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../modal.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'modal',
    templateUrl: './header-editor.component.html',
    styleUrls: ['./header-editor.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
    @Input() id: string;
    header;
    element;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        document.body.appendChild(this.element);
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.parentNode.removeChild(this.element);
    }

    // open modal
    open(header): void {
      this.header = header;
      this.element.style.display = 'block';
      document.body.classList.add('modal-open');
    }

    // close modal
    close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
}