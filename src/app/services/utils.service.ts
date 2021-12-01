import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import * as $ from 'jquery';
// import * as bootstrap from 'bootstrap';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modalService: NgbModal
  ) { }

  // openLg(content: any) {
  //   this.modalService.open(content, { size: 'lg' });
  // }

  closeModal(modalID: string, openBtnID: string) {
    $(`#${modalID}`).modal().hide();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    // fake click to avoid double clicking
    $(`#${openBtnID}`).click();
  }

  showModal(modalID: string): void {
    $(`#${modalID}`).modal('show');
  }
}
