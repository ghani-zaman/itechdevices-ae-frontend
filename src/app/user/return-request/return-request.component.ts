// src/app/return-request/return-request.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyToastService } from 'src/app/services/my-toast.service';
import { OrderReturnService } from 'src/app/services/order-return.service';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';


@Component({
  selector: 'app-return-request',
  templateUrl: './return-request.component.html',
  styleUrls: ['./return-request.component.sass']
})
export class ReturnRequestComponent implements OnInit {
  returnRequestForm: FormGroup;
  orderReturns: any[] = [];
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 10;
  keyword = '';
  isUpdateMode = false; // Flag to indicate whether it's an update mode
  selectedOrderReturnId: number | null = null;
  formCreated = false;
  submitLoading = false;
  searchLoadiing = false;
  deleteLoading = -1;

  constructor(private formBuilder: FormBuilder, private orderReturnService: OrderReturnService, private toast: MyToastService, private title: Title, private meta: Meta, private seo: SEOService) {
    this.returnRequestForm = this.formBuilder.group({
      id: [''], // Include the ID for updating
      order_number: ['', Validators.required],
      part_number: ['', Validators.required],
      reason_for_rma: ['', Validators.required],
    });
    this.formCreated = true;
  }

  async ngOnInit() {
    await this.fetchOrderReturns();
    const seoTitle = 'Return Request | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Itech Devices dashboard provides orders submitted and tracks return requests easily.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

  async onSubmit() {
    if (this.returnRequestForm.valid) {
      const formData = this.returnRequestForm.value;

      if (this.isUpdateMode) {
        // If in update mode, call the update method
        await this.onUpdate(formData);
      } else {
        // If not in update mode, call the create method
        try {
          this.submitLoading = true;
          const response = await this.orderReturnService.createOrderReturn(formData);
          this.toast.success('Return request submitted successfully');
          // console.log('Return request submitted successfully:', response);
          await this.fetchOrderReturns();
          this.returnRequestForm.reset();
          this.submitLoading = false; // Reset the form after submission
        } catch (error) {
          this.submitLoading = false;
          this.toast.error('Error submitting return request:');
          //console.error('Error submitting return request:', error);
        }
      }
    }
  }



  // Switch to update mode and set the selected order return data in the form
  async updateOrderReturn(orderReturn: any) {
    this.isUpdateMode = true;
    this.selectedOrderReturnId = orderReturn.id;

    // Set the values in the form for editing
    this.returnRequestForm.setValue({
      id: orderReturn.id,
      order_number: orderReturn.order_number,
      part_number: orderReturn.part_number,
      reason_for_rma: orderReturn.reason_for_rma,
    });
  }

  // Clear the form and switch back to add mode
  cancelUpdate() {
    this.isUpdateMode = false;
    this.selectedOrderReturnId = null;
    this.returnRequestForm.reset();
  }

  async onUpdate(formData: any) {
    try {
      this.submitLoading = true;
      const response = await this.orderReturnService.updateOrderReturn( this.selectedOrderReturnId, formData);
      this.toast.success('Order return updated successfully');
      // console.log('Order return updated successfully:', response);
      await this.fetchOrderReturns();
      this.cancelUpdate();
      this.submitLoading = false;// Reset the form and switch back to add mode after updating
    } catch (error) {
      this.submitLoading = false;
      this.toast.error('Error updating order return');
     //  console.error('Error updating order return:', error);
    }
  }

  async fetchOrderReturns() {
    try {
      this.searchLoadiing = true;
      const response = await this.orderReturnService.getOrderReturns(this.currentPage, this.keyword);
      // console.log(response);
      this.orderReturns = response.data.data; // Assuming the API response has a 'data' property
      this.totalItems = response.data.total;
      this.searchLoadiing = false;
    } catch (error) {
      this.searchLoadiing = false;

    }
  }



  async onPageChange(page: number) {
    this.currentPage = page;
    await this.fetchOrderReturns();
  }



  async deleteOrderReturn(orderReturnId: number) {
    try {
      this.deleteLoading = orderReturnId;
      await this.orderReturnService.deleteOrderReturn(orderReturnId);
      this.toast.success('Order return deleted successfully.');
      // console.log('Order return deleted successfully.');
      await this.fetchOrderReturns();
      this.deleteLoading = -1;// Refresh the order returns after deletion
    } catch (error) {
      this.deleteLoading = -1;
      this.toast.error('Error deleting order return');
      // console.error('Error deleting order return:', error);
    }
  }

  async onSearch() {
    await this.fetchOrderReturns();
  }
}
