import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfService } from 'src/app/services/pdf.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  @ViewChild('contentToConvert', { static: false }) contentToConvert: ElementRef;
  order = null;
  orderloading = false;
  loading = false;
  id: any = null;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private pdfService: PdfService,
    private aRouter: ActivatedRoute
  ) {
    this.id = (this.aRouter.snapshot.params['id'])? this.aRouter.snapshot.params['id'] : null;
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.getOrderDetails(this.id);
    }
  }

  async getOrderDetails(id): Promise<void> {
    try{
      this.orderloading = true;
      let  orderData: any = [];
      if (await this.userService.isAuthenticated()) {
        orderData = await this.orderService
        .getOrderById(id)
        .toPromise();
      } else {
        orderData = await this.orderService
        .getGuestOrderById(this.id)
        .toPromise();
      }

      this.order = orderData.data;
      this.orderloading = false;
    }catch (err){
      this.orderloading = false;
    }
  }

  async exportToPdf() {
    const elementId = 'contentToConvert';
    const fileName = 'invoice';
    this.loading = true;
    await this.pdfService.exportToPdf(elementId, fileName);
    this.loading = false;
  }
}
