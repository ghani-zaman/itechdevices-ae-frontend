import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialogComponent implements OnInit {
  xdata = 'false';
  constructor(
    private modalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
  }

  async confirm(data): Promise<void> {
      this.modalService.setModalData({confirm: data}, 'confirmModal', true);
      this.modalService.close('confirmModal');
      this.modalService.removeModal('confirmModal');
  }

}
