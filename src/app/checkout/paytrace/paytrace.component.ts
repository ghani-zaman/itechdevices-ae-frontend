import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';
declare const PTPayment;

@Component({
  selector: 'app-paytrace',
  templateUrl: './paytrace.component.html',
  styleUrls: ['./paytrace.component.sass'],
  host: {ngSkipHydration: 'true'},
})
export class PaytraceComponent implements OnInit {
  loadingform = false;
  @Input() orderId = null;
  @Input() cart = null;
  @Input() form = null;
  @Output() orderPaid = new EventEmitter<boolean>();
  order = null;
  paymentMethods: any = {
    bank_transfer: false,
    cash_on_delivery: false,
    paypal: true
  };
  paymentloading = false;
  paymentForm: UntypedFormGroup;
  paymentFormCreated = false;
  paymentsuccess = false;
  transaction = null;
  // tslint:disable-next-line:variable-name
  payment_method = 'paytrace';
  constructor(
    private orderService: OrderService,
    private arouter: ActivatedRoute,
    private builder: UntypedFormBuilder,
    private router: Router,
    private userService: UserService,
    private toast: MyToastService,
    private websiteService: WebsiteService,
    private dataLayerService: DataLayerService
  ) {
    // this.orderId = this.arouter.snapshot.params.id;
  }

  async  ngOnInit(): Promise<void> {
    await this.getPaymentMethods();
    this.createCardForm();
    // this.purchaseGaEvent();
  }
  async getPaymentMethods(): Promise<void> {
    try {
      const resp: any = await this.websiteService.getWebsitePaymentMethod().toPromise();
      const paymentMethod: any = resp.data;
      const billCountry = (this.form.bcountry) ? this.form.bcountry : this.form.country;
      if (
        paymentMethod?.bank_transfer &&
        paymentMethod.bank_transfer.enabled === 'YES' &&
       // (paymentMethod.bank_transfer.min_order_amount != null && paymentMethod.bank_transfer.min_order_amount < this.cart.total_amount) &&
        ((paymentMethod.bank_transfer.countries.indexOf('all') > -1) || paymentMethod.bank_transfer.countries.indexOf(billCountry) > -1)
      ) {
        this.paymentMethods.bank_transfer = true;
        if(this.payment_method === null) {
          this.payment_method = 'banktransfer';
        }
      } else {
        this.paymentMethods.bank_transfer = false;
      }

      if (
        paymentMethod?.cash_on_delivery &&
        paymentMethod.cash_on_delivery.enabled === 'YES' &&
       // (paymentMethod.bank_transfer.min_order_amount != null && paymentMethod.bank_transfer.min_order_amount < this.cart.total_amount) &&
        // tslint:disable-next-line:max-line-length
        ((paymentMethod.cash_on_delivery.countries.indexOf('all') > -1) || paymentMethod.cash_on_delivery.countries.indexOf(billCountry) > -1)
      ) {
        this.paymentMethods.cash_on_delivery = true;
        if(this.payment_method === null) {
          this.payment_method = 'cod';
        }
      } else {
        this.paymentMethods.cash_on_delivery = false;
      }

      if (
        paymentMethod?.paypal &&
        paymentMethod.paypal.enabled === 'YES' &&
       // (paymentMethod.bank_transfer.min_order_amount != null && paymentMethod.bank_transfer.min_order_amount < this.cart.total_amount) &&
        // tslint:disable-next-line:max-line-length
        ((paymentMethod.paypal.countries.indexOf('all') > -1) || paymentMethod.paypal.countries.indexOf(billCountry) > -1)
      ) {
        this.paymentMethods.paypal = true;
        if(this.payment_method === null) {
          this.payment_method = 'paytrace';
        }
      } else {
        this.paymentMethods.paypal = true;
      }
      // console.log('form', this.paymentMethods);
    }catch (err) {
      // console.log('form', err);
      this.paymentMethods = null;
    }
  }
  createPaymentForm(data): void {
    this.paymentForm = this.builder.group({
      hpf_token: [data.hpf_token, [Validators.required]],
      enc_key: [data.enc_key, [Validators.required]],
    });
    this.submitPaymentForm();
  }
  async purchaseGaEvent() {
    let order: any = {};
    if(await this.userService.isAuthenticated()){
      order = await this.orderService.getOrderByInternalId(this.orderId).toPromise();
    } else {
      order  = await this.orderService.getGuestOrderByInternalId(this.orderId).toPromise();
    }
    order = order.data;
    let items = [];
    for(let i = 0; i<order.orderItems.length; i++) {
      const item = {
        "item_id": order.orderItems[i].productInfo.id,
        "item_name": order.orderItems[i].productInfo.title,
        "price": order.orderItems[i].total_price,
        "item_brand": order.orderItems[i].productInfo.brand_name,
        "item_category": order.orderItems[i].productInfo.category_name,
        "quantity": order.orderItems[i].qty_ordered,
        "item_variant": order.orderItems[i].productInfo.sku,
        "index": 0
      }
      items[i] = item;
    }
    const GaEvent = {
      "event": "purchase",
      "ecommerce": {
      "items": items,
      "currency": "AED",
      "value": order.grand_total,
      "transaction_id": order.transaction_id,
      "tax": order.tax_amount,
      "sub_total": order.sub_total,
      "shipping": order.shipping_amount,
      }
     };
     // console.log('Gevent', GaEvent);
    this.dataLayerService.logCustomDataEvent(GaEvent);
  }
  async submitPaymentForm(direct = false): Promise<void> {
    if (direct === false && this.paymentForm?.invalid) {
      return ;
    }
    try {
      this.paymentloading = true;
      this.dataLayerService.logCustomDataEvent({event: 'add_payment_info'});
      // tslint:disable-next-line:prefer-const
      let data: any = {};
      if (this.payment_method === 'paytrace') {
        // tslint:disable-next-line:no-string-literal
        data.hpf_token = this.paymentForm.controls['hpf_token'].value;
        // tslint:disable-next-line:no-string-literal
        data.enc_key = this.paymentForm.controls['enc_key'].value;
        data.payment_method = this.payment_method;
      } else {
        data.payment_method = this.payment_method;
      }
      const orderData = await this.orderService.payTracePayment(this.orderId, data);
      // console.log('odata', orderData);
      if (this.payment_method === 'paytrace') {
        if (orderData.success) {
          const temp = await this.purchaseGaEvent();
          this.orderPaid.emit(true);
          this.paymentloading = false;
          this.paymentsuccess = true;
          this.transaction = orderData.transaction_id;
        } else {
          this.createCardForm();
          this.paymentloading = false;
          this.orderPaid.emit(false);
        }
      } else {
        if (orderData) {
          // console.log('odata', orderData);
          const temp = await this.purchaseGaEvent();
          this.orderPaid.emit(true);
          this.paymentloading = false;
          this.paymentsuccess = true;
        } else {
          this.createCardForm();
          this.paymentloading = false;
          this.orderPaid.emit(false);
        }
      }
      return;
    } catch (err) {
      // console.log('eserror', err);
      this.orderPaid.emit(false);
      this.createCardForm();
      this.paymentloading = false;
    }
  }

  processForm(result): void {
    this.createPaymentForm(result.message);
  }

  handleError(error): void {
    // console.log(error);
  }
  async getOrder(): Promise<any> {
    try {
      let  orderData: any = [];
      if (await this.userService.isAuthenticated()) {
        orderData = await this.orderService
        .getOrderByInternalId(this.orderId)
        .toPromise();
      } else {
        orderData = await this.orderService
        .getGuestOrderByInternalId(this.orderId)
        .toPromise();
      }

      if ( orderData.data.status != 'notpaid') {
        this.router.navigate(['/']);
      }
      return orderData.data;
    } catch (err) {
      return false;
    }
  }
  async createCardForm(): Promise<void> {
    try {
      this.loadingform = true;
      const clientKey = await this.getPaymentKey();
      this.order = await this.getOrder();
      if (clientKey) {
        PTPayment.setup({
          styles: {
            code: {
              font_color: '#000',
              border_color: '#c4c4c4',
              border_style: 'solid',
              font_size: '13pt',
              input_border_radius: '0px',
              input_border_width: '2px',
              input_font: 'Open Sans, sans-serif',
              input_font_weight: '400',
              input_margin: '5px 0px 5px 00px',
              input_padding: '0px 5px 0px 0px',
              label_color: '#003157',
              label_size: '14px',
              label_width: '100%',
              label_font: 'sans-serif, arial, serif',
              label_font_weight: 'normal',
              label_margin: '5px 0px 0px 0px',
              label_padding: '2px 5px 2px 0px',
              label_border_style: 'dotted',
              label_border_color: '#EF9F6D',
              label_border_radius: '10px',
              label_border_width: '0px',
              background_color: 'white',
              height: '25px',
              width: '97%',
              padding_bottom: '2px',
            },
            cc: {
              font_color: '#000',
              border_color: '#c4c4c4',
              border_style: 'solid',
              font_size: '13pt',
              input_border_radius: '0px',
              input_border_width: '2px',
              input_font: 'Open Sans, sans-serif',
              input_font_weight: '400',
              input_margin: '5px 0px 5px 0px',
              input_padding: '0px 5px 0px 5px',
              label_color: '#003157',
              label_size: '14px',
              label_width: '150px',
              label_font: 'sans-serif, arial, serif',
              label_font_weight: 'normal',
              label_margin: '5px 0px 0px 0px',
              label_padding: '0px 5px 0px 5px',
              label_border_style: 'solid',
              label_border_color: '#EF9F6D',
              label_border_radius: '0px',
              label_border_width: '0px',
              background_color: 'white',
              height: '25px',
              width: '96%',
              padding_bottom: '0px',
            },
            exp: {
              font_color: '#000',
              border_color: '#c4c4c4',
              border_style: 'solid',
              font_size: '12pt',
              input_border_radius: '0px',
              input_border_width: '2px',
              input_font: 'Open Sans, sans-serif',
              input_font_weight: '400',
              input_margin: '5px 0px 5px 0px',
              input_padding: '0px 5px 0px 5px',
              label_color: '#003157',
              label_size: '14px',
              label_width: '100%',
              label_font: 'sans-serif, arial, serif',
              label_font_weight: 'normal',
              label_margin: '5px 0px 0px 0px',
              label_padding: '2px 5px 2px 5px',
              label_border_style: 'dashed',
              label_border_color: '#EF9F6D',
              label_border_radius: '0px',
              label_border_width: '0px',
              background_color: 'white',
              height: '30px',
              width: '45%',
              padding_bottom: '2px',
              type: 'dropdown',
            },
            body: {
              background_color: '#f9f9f9',
            },
          },
          authorization: { clientKey },
        }).then((instance) => {
          // console.log(instance);
          PTPayment.theme('label-extended-top')
          document
            .getElementById('ProtectForm')
            .addEventListener('submit', (e) => {
              e.preventDefault();
              e.stopPropagation();

              // To trigger the validation of sensitive data payment fields within the iframe before calling the tokenization process:
              PTPayment.validate((validationErrors) => {
                 // console.log(validationErrors);
                if (validationErrors.length >= 1) {
                  // tslint:disable-next-line:no-string-literal
                  if (validationErrors[0]['responseCode'] == '35') {

                    // Handle validation Errors here
                    // This is an example of using dynamic styling to show the Credit card number entered is invalid
                    PTPayment.style({ cc: { border_color: 'red' } });
                    this.toast.error('Please provide a valid Credit Card Number');
                  }
                  if (validationErrors[0]['responseCode'] == '43') {
                    // Handle validation Errors here
                    // This is an example of using dynamic styling to show the Credit card number entered is invalid
                    PTPayment.style({ exp: { border_color: 'red' } });
                    this.toast.error('Please provide a valid Expiry Date');
                  }
                  if (validationErrors[0]['responseCode'] == '44') {
                    // Handle validation Errors here
                    // This is an example of using dynamic styling to show the Credit card number entered is invalid
                    PTPayment.style({ exp: { border_color: 'red' } });
                    this.toast.error('Please provide a valid Expiry Date');
                  }
                  if (validationErrors[0]['responseCode'] == '148') {
                    // Handle validation Errors here
                    // This is an example of using dynamic styling to show the Credit card number entered is invalid
                    PTPayment.style({ code: { border_color: 'red' } });
                    this.toast.error('Please provide a valid Security Code');
                  }
                } else {
                  // no error so tokenize
                  instance
                    .process()
                    .then((r) => this.processForm(r))
                    .catch((err) => this.handleError(err));
                }
              }); // end of PTPayment.validate
            }); // end of add event listener submit
        });
      }
      this.loadingform = false;
    } catch (err) {
      this.loadingform = false;
    }
  }

  async getPaymentKey(): Promise<any> {
    try {
      const data = await this.orderService.getPayTraceKey(this.orderId).toPromise();
      return data.data;
    } catch (err) {
      return false;
    }
  }
}
