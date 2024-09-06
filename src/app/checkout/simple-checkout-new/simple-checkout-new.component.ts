import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CscService } from 'src/app/services/csc.service';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { debounceTime, fromEvent, lastValueFrom, take } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';
import { creditCardValidator, expiryDateValidator, positiveNumberValidatior } from 'src/app/customValidators';
import {
  injectStripe,
  StripeCardComponent,
  StripeCardNumberComponent,
  StripeService,
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
@Component({
  selector: 'app-simple-checkout-new',
  templateUrl: './simple-checkout-new.component.html',
  styleUrls: ['./simple-checkout-new.component.css'],
  host: {ngSkipHydration: 'true'},
})
export class SimpleCheckoutNewComponent implements OnInit {
  cart: any;
  cartloading = false;
  placingorder = false;
  checkoutForm: UntypedFormGroup;
  formcreated = false;
  isGuest = true;
  countriesList = [];
  shipStateList = [];
  billStateList = [];
  shipCityList = [];
  billCityList = [];
  orderid = null;
  orderNumber = null;
  cartCount = 0;
  shippingAddresses = [];
  billingAddresses = [];
  paymentMethods: any = {
    bank_transfer: false,
    cash_on_delivery: false,
    paytrace: false,
    stripe: true
  };
  paymentloading = false;
  payment_method = null;
  loadshipping = false;
  shippingMethods = [];
  loadbillform = false;
  orderPaid = false;
  siteKey = environment.googleSiteKey;
  useCaptcha = environment.useCaptcha;
  isBrowser = false;
  twdisc = 0;
  @ViewChild(StripeCardNumberComponent) cardElement!: StripeCardNumberComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '100',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
  @ViewChild('captchaRef', {static: false}) captchaRef: any;
  constructor(
    private cartService: CartService,
    private toast: MyToastService,
    private userService: UserService,
    private builder: UntypedFormBuilder,
    private orderService: OrderService,
    private router: Router,
    private csc: CscService,
    private websiteService: WebsiteService,
    private arouter: ActivatedRoute,
    private dataLayerService: DataLayerService,
    private title: Title,
    private seoService: SEOService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId,
    private el: ElementRef,
    private stripeService: StripeService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // this.countriesList = environment.countriesList;
  }

  async ngOnInit(): Promise<void> {
    this.countriesList = await this.csc.getCountriesList();
    await this.getPaymentMethods();
    this.title.setTitle('Check Out');
    this.seoService.logZendeskEvent();
    await this.getUserInfo();
    await this.getcart();
    if(this.isBrowser) {
      if(localStorage.getItem('orderSuccess')) {
        localStorage.removeItem('orderSuccess');
      }
    }
  }



  public  isDate(dateParam: any) {
    const date = new Date(dateParam)
    // console.log(date instanceof Date && !isNaN(date.valueOf()));
    return (date instanceof Date && !isNaN(date.valueOf()));
  }

  async getShippingMethods(): Promise<void> {
    try {
      const resp: any = await this.websiteService.getWebsiteShippingMethod().toPromise();
      return resp.data;
    }catch (err) {
      this.shippingMethods = [];
    }
  }

  gotoLogin(): void {
    this.router.navigate(['/user/login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  async getUserInfo(): Promise<void> {
    try {
      const isAuthenticated = await this.userService.isAuthenticated();
      if (isAuthenticated) {
        this.isGuest = false;
        this.createUserCheckOutForm();
        this.shippingAddresses = await this.userService.getAllUserAddresses(
          'shipping'
        );
        this.billingAddresses = await this.userService.getAllUserAddresses(
          'billing'
        );
      } else {
        this.isGuest = true;
        this.createGuestCheckOutForm();
      }
    } catch (err) {
      this.isGuest = true;
      this.createGuestCheckOutForm();
    }
  }

  addCardValidators(){
    if(this.checkoutForm.controls.payment_method.value === 'paytrace') {

      const cardNumber = this.checkoutForm.get('cardNumber');
      cardNumber.clearValidators();
      cardNumber.setValidators([Validators.required, creditCardValidator()]);
      cardNumber.updateValueAndValidity();
      const cardExpiry = this.checkoutForm.get('cardExpiry');
      cardExpiry.clearValidators();
      cardExpiry.setValidators([Validators.required, expiryDateValidator()]);
      cardExpiry.updateValueAndValidity();
      const cardCvc = this.checkoutForm.get('cardCvc');
      cardCvc.clearValidators();
      cardCvc.setValidators([Validators.required, positiveNumberValidatior(), Validators.minLength(3), Validators.maxLength(4)]);
      cardCvc.updateValueAndValidity();
    }else{
      const cardNumber = this.checkoutForm.get('cardNumber');
      cardNumber.clearValidators();
      cardNumber.setValidators([]);
      cardNumber.updateValueAndValidity();
      const cardExpiry = this.checkoutForm.get('cardExpiry');
      cardExpiry.clearValidators();
      cardExpiry.setValidators([]);
      cardExpiry.updateValueAndValidity();
      const cardCvc = this.checkoutForm.get('cardCvc');
      cardCvc.clearValidators();
      cardCvc.setValidators([]);
      cardCvc.updateValueAndValidity();
    }
  }

  formatMonthYear() {
    // Remove any non-digit characters
    var value = this.checkoutForm.controls.cardExpiry.value.replace(/\D/g, '');

    // Format as MM/YYYY
    var formattedValue = value.replace(/^(\d{2})/, '$1/');

    // Update input value
    this.checkoutForm.controls.cardExpiry.setValue(formattedValue);
}
  async getPaymentMethods(): Promise<void> {
    try {
      this.paymentloading = true;
      const resp$: any = this.websiteService.getWebsitePaymentMethod();
      const resp: any = await lastValueFrom(resp$);
      const paymentMethod: any = resp.data;
      let billCountry = 'AE';
      if(this.checkoutForm && this.checkoutForm.controls.use_shipping_as_billing.value && this.checkoutForm.controls.country.value) {
        billCountry = this.checkoutForm.controls.country.value;
      }

      if(this.checkoutForm && !this.checkoutForm.controls.use_shipping_as_billing.value && this.checkoutForm.controls.bcountry.value) {
        billCountry = this.checkoutForm.controls.bcountry.value;
      }

      if (
        paymentMethod?.bank_transfer &&
        paymentMethod.bank_transfer.enabled === 'YES' &&

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
        paymentMethod?.paytrace &&
        paymentMethod.paytrace.enabled === 'YES' &&
       // (paymentMethod.bank_transfer.min_order_amount != null && paymentMethod.bank_transfer.min_order_amount < this.cart.total_amount) &&
        // tslint:disable-next-line:max-line-length
        ((paymentMethod.paytrace.countries.indexOf('all') > -1) || paymentMethod.paytrace.countries.indexOf(billCountry) > -1)
      ) {
        this.paymentMethods.paytrace = true;
        if(this.payment_method === null) {
          this.payment_method = 'paytrace';
        }
      } else {
        this.paymentMethods.paytrace = false;
        if(this.payment_method === null) {
          this.payment_method = 'paytrace';
        }
      }
      if (
        paymentMethod?.stripe &&
        paymentMethod.stripe.enabled === 'YES' &&
        // (paymentMethod.bank_transfer.min_order_amount != null && paymentMethod.bank_transfer.min_order_amount < this.cart.total_amount) &&
        // tslint:disable-next-line:max-line-length
        (paymentMethod.stripe.countries.indexOf('all') > -1 ||
          paymentMethod.stripe.countries.indexOf(billCountry) > -1)
      ) {
        this.paymentMethods.stripe = true;
        if (this.payment_method === null) {
          this.payment_method = 'stripe';
        }
      } else {
        this.paymentMethods.stripe = true;
      }
      this.paymentloading = false;
       //console.log('form', this.payment_method);
    }catch (err) {
      console.log('form', err);
      this.paymentloading = false;
      this.paymentMethods = null;
    }
  }

  async selectShippingAddress(event): Promise<any> {
    const index = event.target.value;
    await this.getShipStates(this.shippingAddresses[index].country);
    await this.getShipCities(this.shippingAddresses[index].state);
    if (index === 'novalue') {
      this.checkoutForm.controls.first_name.setValue(null);
      this.checkoutForm.controls.last_name.setValue(null);
      this.checkoutForm.controls.company_name.setValue(null);
      this.checkoutForm.controls.phone.setValue(null);
      this.checkoutForm.controls.street_address1.setValue(null);
      this.checkoutForm.controls.city.setValue(null);
      this.checkoutForm.controls.state.setValue(null);
      this.checkoutForm.controls.country.setValue(null);
      this.checkoutForm.controls.zip.setValue(null);
    } else {
      this.checkoutForm.controls.first_name.setValue(
        this.shippingAddresses[index].first_name
      );
      this.checkoutForm.controls.last_name.setValue(
        this.shippingAddresses[index].last_name
      );
      this.checkoutForm.controls.company_name.setValue(
        this.shippingAddresses[index].company_name
      );
      this.checkoutForm.controls.phone.setValue(
        this.shippingAddresses[index].phone
      );
      this.checkoutForm.controls.street_address1.setValue(
        this.shippingAddresses[index].street_address1
      );
      this.checkoutForm.controls.city.setValue(
        this.shippingAddresses[index].city
      );
      this.checkoutForm.controls.state.setValue(
        this.shippingAddresses[index].state
      );
      this.checkoutForm.controls.country.setValue(
        this.shippingAddresses[index].country
      );
      this.checkoutForm.controls.zip.setValue(
        this.shippingAddresses[index].zip
      );
    }

    this.calculateShipping();
  }
  async selectBillingAddress(event): Promise<any>{
    const index = event.target.value;
    await this.getBillStates(this.shippingAddresses[index].country);
    await this.getBillCities(this.shippingAddresses[index].state);
    if (index === 'novalue') {
      this.checkoutForm.controls.bfirst_name.setValue(null);
      this.checkoutForm.controls.blast_name.setValue(null);
      this.checkoutForm.controls.bcompany_name.setValue(null);
      this.checkoutForm.controls.bphone.setValue(null);
      this.checkoutForm.controls.bstreet_address1.setValue(null);
      this.checkoutForm.controls.bcity.setValue(null);
      this.checkoutForm.controls.bstate.setValue(null);
      this.checkoutForm.controls.bcountry.setValue(null);
      this.checkoutForm.controls.bzip.setValue(null);
    } else {
      this.checkoutForm.controls.bfirst_name.setValue(
        this.billingAddresses[index].first_name
      );
      this.checkoutForm.controls.blast_name.setValue(
        this.billingAddresses[index].last_name
      );
      this.checkoutForm.controls.bcompany_name.setValue(
        this.billingAddresses[index].company_name
      );
      this.checkoutForm.controls.bphone.setValue(
        this.billingAddresses[index].phone
      );
      this.checkoutForm.controls.bstreet_address1.setValue(
        this.billingAddresses[index].street_address1
      );
      this.checkoutForm.controls.bcity.setValue(
        this.billingAddresses[index].city
      );
      this.checkoutForm.controls.bstate.setValue(
        this.billingAddresses[index].state
      );
      this.checkoutForm.controls.bcountry.setValue(
        this.billingAddresses[index].country
      );
      this.checkoutForm.controls.bzip.setValue(
        this.billingAddresses[index].zip
      );


    }
  }

  createGuestCheckOutForm(): void {
    this.checkoutForm = this.builder.group({
      email: [null, [Validators.required, Validators.email]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      company_name: [null, []],
      phone: [null, [Validators.required]],
      street_address1: [null, [Validators.required]],
      citymanual: [true],
      city: [null, []],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      country: [null, [Validators.required]],
      bemail: [null, [Validators.required, Validators.email]],
      bfirst_name: [null, [Validators.required]],
      blast_name: [null, [Validators.required]],
      bcompany_name: [null, []],
      bphone: [null, [Validators.required]],
      bstreet_address1: [null, [Validators.required]],
      bcitymanual: [true],
      bcity: [null, []],
      bstate: [null, [Validators.required]],
      bzip: [null, [Validators.required]],
      bcountry: [null, [Validators.required]],
      cartid: [null, [Validators.required]],
      use_shipping_as_billing: [false],
      shipping_method: [null, [Validators.required]],
      shipping_method_code: [null, [Validators.required]],
      shipping_type: [null, []],
      shipping_date: [null],
      shipping_amount: [null, [Validators.required]],
      recaptchaReactive: [null, []],
      taxAmount: [0],
      discount_amount: [0],
      payment_method: [this.payment_method, [Validators.required]],
      cardNumber: [null, []],
      cardExpiry: [null, []],
      cardCvc: [null, []]
    });
    this.formcreated = true;

    // tslint:disable-next-line:no-string-literal
    this.checkoutForm.controls['country'].setValue('AE');
    // tslint:disable-next-line:no-string-literal
    this.checkoutForm.controls['bcountry'].setValue('AE');

    this.getShipStates(this.checkoutForm.controls.country.value);

    this.getBillStates(this.checkoutForm.controls.bcountry.value);
    this.addCardValidators();
  }

  changeBillShip(event): void {
    this.loadbillform = true;
    if (!event.currentTarget.checked) {
      if (this.isGuest) {
        this.checkoutForm.addControl(
          'bemail',
          new UntypedFormControl(null, [Validators.required, Validators.email])
        );
      } else {
        this.checkoutForm.addControl(
          'baddressid',
          new UntypedFormControl('novalue', [])
        );
      }
      this.checkoutForm.addControl(
        'bfirst_name',
        new UntypedFormControl(null, [Validators.required])
      );
      this.checkoutForm.addControl(
        'blast_name',
        new UntypedFormControl(null, [Validators.required])
      );
      this.checkoutForm.addControl('bcompany_name', new UntypedFormControl(null, []));
      this.checkoutForm.addControl(
        'bphone',
        new UntypedFormControl(null, [Validators.required])
      );
      this.checkoutForm.addControl(
        'bcity',
        new UntypedFormControl(null, [Validators.required])
      );
      this.checkoutForm.addControl(
        'bstate',
        new UntypedFormControl(null, [Validators.required])
      );
      this.checkoutForm.addControl(
        'bzip',
        new UntypedFormControl(null, [Validators.required])
      );
      this.checkoutForm.addControl(
        'bstreet_address1',
        new UntypedFormControl(null, [Validators.required])
      );
      this.checkoutForm.addControl(
        'bcountry',
        new UntypedFormControl(null, [Validators.required])
      );
    } else {
      if (this.checkoutForm.controls.bemail) {
        this.checkoutForm.removeControl('bemail');
      }
      if (this.checkoutForm.controls.bemail) {
        this.checkoutForm.removeControl('baddressid');
      }
      this.checkoutForm.removeControl('bfirst_name');
      this.checkoutForm.removeControl('blast_name');
      this.checkoutForm.removeControl('bcompany_name');
      this.checkoutForm.removeControl('bphone');
      this.checkoutForm.removeControl('bcity');
      this.checkoutForm.removeControl('bstate');
      this.checkoutForm.removeControl('bzip');
      this.checkoutForm.removeControl('bstreet_address1');
      this.checkoutForm.removeControl('bcountry');
    }
    this.loadbillform = false;
    // console.log(this.checkoutForm.controls);
  }

  createUserCheckOutForm(): void {
    this.checkoutForm = this.builder.group({
      addressid: ['novalue', []],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      company_name: [null, []],
      phone: [null, [Validators.required]],
      street_address1: [null, [Validators.required]],
      citymanual: [true],
      city: [null, []],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      country: [null, [Validators.required]],
      baddressid: ['novalue', []],
      bfirst_name: [null, [Validators.required]],
      blast_name: [null, [Validators.required]],
      bcompany_name: [null, []],
      bphone: [null, [Validators.required]],
      bstreet_address1: [null, [Validators.required]],
      bcitymanual: [true],
      bcity: [null, []],
      bstate: [null, [Validators.required]],
      bzip: [null, [Validators.required]],
      bcountry: [null, [Validators.required]],
      cartid: [null, [Validators.required]],
      use_shipping_as_billing: [false],
      shipping_method: [null, [Validators.required]],
      shipping_method_code: [null, [Validators.required]],
      shipping_type: [null, []],
      shipping_date: [null],
      shipping_amount: [null, [Validators.required]],
      recaptchaReactive: [null, []],
      taxAmount: [0],
      discount_amount: [0],
      payment_method: [this.payment_method, [Validators.required]],
      cardNumber: [null, []],
      cardExpiry: [null, []],
      cardCvc: [null, []]
    });
    this.formcreated = true;
    // tslint:disable-next-line:no-string-literal
    this.checkoutForm.controls['country'].setValue('AE');
    // tslint:disable-next-line:no-string-literal
    this.checkoutForm.controls['bcountry'].setValue('AE');

    this.getShipStates(this.checkoutForm.controls.country.value);
    this.getBillStates(this.checkoutForm.controls.bcountry.value);
    this.addCardValidators();
  }

  async getcart(): Promise<void> {
    try {
      this.cartloading = true;
      const cartData = await this.cartService.getFullcartList().toPromise();
      if (cartData) {
        this.cart = cartData.data;
        this.calculateDiscountPrice(this.cart.products);
        if (this.cart.products.length === 0) {
          this.router.navigate(['/']);
          this.toast.error('Your cart is empty');
        }
        this.checkoutForm.controls.cartid.setValue(this.cart.cart_id);
      } else {
        this.router.navigate(['/']);
        this.toast.error('Your cart is empty');
      }
      // console.log('cart', this.cart);
      this.beginCheckout();
      this.calculateTax();
      this.calculateDiscount();
      this.cartloading = false;
    } catch (err) {
      this.cartloading = false;
    }
  }
  calculateDiscountPrice(cart) {
    const data = cart;
    let totalWithoutDiscount = 0;
    if (data) {
      for (const p of cart) {
        totalWithoutDiscount = totalWithoutDiscount + (((p[p.condition] *100)/(100-p.discount))*p.qty);
      }
    }
    this.twdisc = totalWithoutDiscount;
  }
  beginCheckout() {
    let items = [];
    for(let i = 0; i<this.cart.products.length; i ++) {
      const item = {
        "item_id": this.cart.products[i].id,
        "item_name": this.cart.products[i].title,
        "price": this.cart.products[i][this.cart.products[i].condition],
        "item_brand": this.cart.products[i].brand_name,
        "item_category": this.cart.products[i].category_name,
        "quantity": this.cart.products[i].qty,
        "item_variant": this.cart.products[i].sku,
        "index": 0
      }
      items[i] = item;
    }
    const GaEvent = {
      "event": "begin_checkout",
      "ecommerce": {
      "items": items,
      "currency": "AED",
      "value": this.cart.sub_total
      }
     };
     // console.log(GaEvent);
    this.dataLayerService.logCustomDataEvent(GaEvent);
  }

  selectShippingMethod(event): void {
    const data = event; //event.target.value;
    //console.log('kkx', this.checkoutForm.controls['shipping_method'].value);
    // console.log('kk', data);
    if (data == 'novalue') {
      this.checkoutForm.controls.shipping_method_code.setValue(null);
      this.checkoutForm.controls.shipping_type.setValue(null);
      this.checkoutForm.controls.shipping_amount.setValue(null);
      this.checkoutForm.controls.shipping_date.setValue(null);
    } else {
      this.checkoutForm.controls.shipping_method_code.setValue(
        this.shippingMethods[data].serviceType
      );
      this.checkoutForm.controls.shipping_type.setValue(
        this.shippingMethods[data].serviceName
      );
      this.checkoutForm.controls.shipping_amount.setValue(
        this.shippingMethods[data].cost
      );
      this.checkoutForm.controls.shipping_date.setValue(
        this.shippingMethods[data].deliveryDate
      );
    }
  }
  async getShipStates($event): Promise<any> {
    try{
      this.checkoutForm.controls.state.setValue(null);
      this.checkoutForm.controls.city.setValue(null);
      this.shipStateList = [];
      this.shipCityList = [];
      const country = this.countriesList.filter(c => c.iso2 === $event);
      // this.shipStateList = await this.csc.getStateList(country[0]?.iso2);
      if($event ==='CA' || $event ==='US'){
        const state = this.checkoutForm.get('state');
        state.clearValidators();
        state.setValidators([Validators.required]);
        state.updateValueAndValidity();
       this.shipStateList = await this.csc.getStateList(country[0]?.iso2);
      }else{
        const state = this.checkoutForm.get('state');
        state.clearValidators();
        state.setValidators([]);
        state.updateValueAndValidity();
      }
    } catch (e){
      this.shipStateList = [];
      this.shipCityList = [];
    }

  }

  async getBillStates($event): Promise<any> {
    try{
      this.checkoutForm.controls.bstate.setValue(null);
      this.checkoutForm.controls.bcity.setValue(null);
      this.billStateList = [];
      this.billCityList = [];
      const country = this.countriesList.filter(c => c.iso2 === $event);
      // this.billStateList = await this.csc.getStateList(country[0]?.iso2);
      if($event ==='CA' || $event ==='US'){
        const state = this.checkoutForm.get('bstate');
        state.clearValidators();
        state.setValidators([Validators.required]);
        state.updateValueAndValidity();
       this.billStateList = await this.csc.getStateList(country[0]?.iso2);
      }else{
        const state = this.checkoutForm.get('bstate');
        state.clearValidators();
        state.setValidators([]);
        state.updateValueAndValidity();
      }
    } catch (e){
      this.billStateList = [];
      this.billCityList = [];
    }

  }

  async getShipCities($event) : Promise<void> {
    return ;
    try{
      this.checkoutForm.controls.city.setValue(null);
      this.shipCityList = [];
      this.shipCityList = await this.csc.getCityList($event);
    } catch (e){
      this.shipCityList = [];
    }
  }
  async getBillCities($event): Promise<void> {
    return;
    try{
      this.checkoutForm.controls.bcity.setValue(null);
      this.billCityList = [];
      this.billCityList = await this.csc.getCityList($event);
    } catch (e){
      this.billCityList = [];
    }
  }
  async calculateTax() {
    this.checkoutForm.controls.taxAmount.setValue(
      this.checkoutForm.controls.country.value === 'AE'
        ? this.cart.sub_total * environment.taxPercent
        : 0
    );
  }

  async calculateTaxShip($event) {
    this.checkoutForm.controls.taxAmount.setValue(
      $event === 'AE' ? this.cart.sub_total * environment.taxPercent : 0
    );
  }

  billingEvent() {
    this.dataLayerService.logCustomDataEvent({event: 'add_billing_info'});
  }

  async calculateDiscount() {
    // console.log('cart > ', this.cart);
    let discount = 0;
    /*dicount disabled
    for (let i = 0; i<this.cart.products.length; i++) {
      const productPrice = this.cart.products[i][this.cart.products[i].condition];
      const subtotal = productPrice * this.cart.products[i].qty;
      const discountPercent = (productPrice >=19 && productPrice<=49)? 0.02: 0.01;
      discount = discount + (subtotal * discountPercent);
    }*/
    this.checkoutForm.controls.discount_amount.setValue(discount);
  }
  async calculateShipping(): Promise<void> {
    const shippingPincode = this.checkoutForm.controls.zip.value;
    const shippingCountry = this.checkoutForm.controls.country.value;
    if (
      !shippingCountry ||
      shippingCountry == null ||
      !shippingPincode ||
      shippingPincode == null ||
      shippingPincode == ''
    ) {
      return;
    }
    try {
      this.loadshipping = true;
      this.dataLayerService.logCustomDataEvent({event: 'add_shipping_info'});
      const shipMethod$: any = await this.websiteService.getWebsiteShippingMethod().toPromise();
      const shipMethod = shipMethod$.data;
      // console.log('carttotal', this.cart);
      if (this.checkoutForm.controls.addressid) {
        this.checkoutForm.controls.addressid.disable();
      }
      this.checkoutForm.controls.zip.disable();
      this.checkoutForm.controls.country.disable();
      this.shippingMethods = [];
      if (false || (shipMethod?.fedex &&
        shipMethod.fedex === 'YES' &&
        ((shipMethod.fedex.countries.indexOf('all') > -1) || shipMethod.fedex.countries.indexOf(shippingCountry) > -1)))
        {
      let res: any;
      if (shippingCountry == 'US') {
        res = await this.orderService.getDomesticRates({
          cartid: this.cart.cart_id,
          pincode: shippingPincode,
          country: shippingCountry,
        });
      } else {
        res = await this.orderService.getInternationalRates({
          cartid: this.cart.cart_id,
          pincode: shippingPincode,
          country: shippingCountry,
        });
      }
      if (res) {
        this.shippingMethods = res;

        if (this.checkoutForm.controls.addressid) {
          this.checkoutForm.controls.addressid.enable();
        }
        this.checkoutForm.controls.zip.enable();
        this.checkoutForm.controls.country.enable();
      } else {
        this.shippingMethods = [];
        if (this.checkoutForm.controls.addressid) {
          this.checkoutForm.controls.addressid.enable();
        }
        this.checkoutForm.controls.zip.enable();
        this.checkoutForm.controls.country.enable();
      }
    }
      // console.log('1',  shipMethod.free_shipping.countries.indexOf(shippingCountry));
      // console.log('2', shipMethod.flat_rate.enabled === 'YES');
      // tslint:disable-next-line:max-line-length
      // console.log('3',  ((shipMethod.flat_rate.countries.indexOf('all') > -1) || shipMethod.flat_rate.countries.indexOf(shippingCountry) > -1));
      if (
          shipMethod?.flat_rate &&
          shipMethod.flat_rate.enabled === 'YES' &&
         // (shipMethod.flat_rate.min_order_amount != null && shipMethod.flat_rate.min_order_amount < this.cart.total_amount) &&
          ((shipMethod.flat_rate.countries.indexOf('all') > -1) || shipMethod.flat_rate.countries.indexOf(shippingCountry) > -1)
          ) {
            const currentDate = new Date();
            const delDate =currentDate.setDate(currentDate.getDate() + 8);
            this.shippingMethods.push({
              serviceType: (shipMethod.flat_rate.method_name !== null) ?  shipMethod.flat_rate.method_name : 'Flat Rate',
              serviceName: (shipMethod.flat_rate.title !== null && shipMethod.flat_rate.title !== '') ?  shipMethod.flat_rate.title : 'Flat Rate',
              cost: (shipMethod.flat_rate.price !== null) ?  (1 * shipMethod.flat_rate.price) : 0,
              deliveryDate: '3 to 5 days'
            });
      }

      if (
        shipMethod?.free_shipping &&
        shipMethod.free_shipping.enabled === 'YES' &&
        // (shipMethod.free_shipping.min_order_amount != null && shipMethod.free_shipping.min_order_amount < this.cart.total_amount) &&
        ((shipMethod.free_shipping.countries.indexOf('all') > -1) || shipMethod.free_shipping.countries.indexOf(shippingCountry) > -1)
        ) {
          const currentDate = new Date();
          const delDate =currentDate.setDate(currentDate.getDate() + 8);
          this.shippingMethods.push({
            serviceType: (shipMethod.free_shipping.method_name !== null) ?  shipMethod.free_shipping.method_name : 'Free Ship',
            serviceName: (shipMethod.free_shipping.title !== null && shipMethod.free_shipping.title !== '') ?  shipMethod.free_shipping.title : 'Free Ship',
            cost: (shipMethod.free_shipping.price !== null) ?  (1 * shipMethod.free_shipping.price) : 0,
            deliveryDate: '3 to 5 days'
          });
    }
      this.checkoutForm.controls.zip.enable();
      this.checkoutForm.controls.country.enable();
      this.loadshipping = false;
      // console.log('shipping', this.shippingMethods);
    } catch (err) {
      this.shippingMethods = [];
      if (this.checkoutForm.controls.addressid) {
        this.checkoutForm.controls.addressid.enable();
      }
      this.checkoutForm.controls.zip.enable();
      this.checkoutForm.controls.country.enable();
      this.loadshipping = false;
    }
    // // console.log(this.cart);
  }

  async markpaid(paid: boolean): Promise<void>{
    const order: any = await this.orderService.getGuestOrderByInternalId(this.orderid).toPromise();
      console.log('our order', order);
      this.orderNumber = (order?.data?.order_id) ? order?.data?.order_id : null;
      if(this.orderNumber != null){
      // console.log(paid);
      if(this.isBrowser) {
        localStorage.setItem('orderSuccess', this.orderNumber);
      }
      this.dataLayerService.logCustomDataEvent({
        'event': 'conversion',
        // 'send_to': 'AW-962887714/YDZDCLbh82MQooCSywM',
        'transaction_id': this.orderid
    });
      setTimeout(() => {
        this.router.navigate(['checkout', 'order-success' + '.html']);
         this.orderPaid = paid;
      }, 2000);

  }
  }

  goToBottom(){
    if(this.isBrowser){
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
  private scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ng-invalid"
    );

    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth"
    });

    fromEvent(window, "scroll")
      .pipe(
        debounceTime(100),
        take(1)
      )
      .subscribe(() => firstInvalidControl.focus());
  }
  async submitForm(form): Promise<any> {
    if(this.useCaptcha) {
      await this.captchaRef.execute();
    }else{
      this.submitNow(form);
    }
  }
  async submitNow(form): Promise<void> {
    if (form.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      return ;
    }
    try {
      this.placingorder = true;
      let tk: any = null;
      if (form.value.payment_method === 'stripe') {
        const token$: any = this.stripeService.createToken(
          this.cardElement.element,
          { name: form.first_name }
        );
        const token: any = await lastValueFrom(token$);
        if (token.error) {
          this.toast.error(token.error.message);
          this.placingorder = false;
          return;
        }
        tk = token.token;
      }
      const data: any = form.value;
      if (data.payment_method === 'stripe') {
        if (tk === null) {
          throw new Error('Invalid payment method');
        }
        data.stripetoken = tk;
      }
      data.landing_url = sessionStorage.getItem('landing_url') ? sessionStorage.getItem('landing_url') : "";
      const order = await this.orderService.addOrderNew(data);
      if(order === false) {
        this.placingorder = false;
        this.orderid = null;
        this.toast.error('Unable to place order');
        return;
      }

      if (order.action) {
        await this.stripeService
          .confirmCardPayment(order.clientSecret)
          .subscribe(async (datax: any) => {
            if (
              datax.paymentIntent &&
              (datax.paymentIntent.status === 'requires_capture' ||
                datax.paymentIntent.status === 'success' ||
                datax.paymentIntent.status === 'succeeded')
            ) {
              data.paymentid = datax.paymentIntent.id;
              data.orderid = order.internal_id;
              const orderStripe = await this.orderService.confirmStripeOrder(
                data
              );
              await this.cartService.calculateCartTotal();
              this.orderid = orderStripe.order_id;
              this.orderNumber = orderStripe?.order_id
                ? orderStripe?.order_id
                : null;
              if (this.orderNumber != null) {
                // console.log(paid);
                if (this.isBrowser) {
                  localStorage.setItem('orderSuccess', this.orderNumber);
                }

                await this.purchaseGaEvent(orderStripe?.internal_id);

                this.dataLayerService.logCustomDataEvent({
                  event: 'conversion',
                  /*'send_to': 'AW-962887714/YDZDCLbh82MQooCSywM',*/
                  transaction_id: orderStripe.order_id,
                });
                setTimeout(() => {
                  this.router.navigate(['checkout', 'order-success' + '.html']);
                  this.orderPaid = true;
                }, 2000);
              }
              setTimeout(() => {
                this.goToBottom();
              }, 500);
              this.placingorder = false;
            }
            if(datax.error) {
              this.toast.error(datax.error.message);
            }
            this.placingorder = false;
            return;
          });
      } else {
        await this.cartService.calculateCartTotal();
        this.orderid = order.order_id;
        this.orderNumber = order?.order_id ? order?.order_id : null;
        if (this.orderNumber != null) {
          // console.log(paid);
          if (this.isBrowser) {
            localStorage.setItem('orderSuccess', this.orderNumber);
          }

          await this.purchaseGaEvent(order?.internal_id);

          this.dataLayerService.logCustomDataEvent({
            event: 'conversion',
            /*'send_to': 'AW-962887714/YDZDCLbh82MQooCSywM',*/
            transaction_id: order.order_id,
          });
          setTimeout(() => {
            this.router.navigate(['checkout', 'order-success' + '.html']);
            this.orderPaid = true;
          }, 2000);
        }
        setTimeout(() => {
          this.goToBottom();
        }, 500);
        this.placingorder = false;
      }
    } catch (err) {
      this.placingorder = false;
      this.orderid = null;
      this.toast.error('Unable to place order');
    }
  }

  async purchaseGaEvent(orderId) {
    let order: any = {};
    if(await this.userService.isAuthenticated()){
      order = await this.orderService.getOrderByInternalId(orderId).toPromise();
    } else {
      order  = await this.orderService.getGuestOrderByInternalId(orderId).toPromise();
    }
    order = order.data;
    // console.log('order', order);
    let items = [];
    for(let i = 0; i<order.orderItems.length; i++) {
      const disc =  ((order.orderItems[i].unit_price * 100) / (100 - order.orderItems[i].productInfo.discount))-order.orderItems[i].unit_price;
     const discround = (Math.round(disc * 100)) /100;
      const item = {
        "item_id": order.orderItems[i].productInfo.id,
        "item_name": order.orderItems[i].productInfo.title,
        "price": order.orderItems[i].unit_price,
        "item_brand": order.orderItems[i].productInfo.brand_name,
        "item_category": order.orderItems[i].productInfo.category_name,
        "quantity": order.orderItems[i].qty_ordered,
        "item_variant": order.orderItems[i].productInfo.sku,
        "discount": discround,
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
      "transaction_id": order.order_id,
      "tax": order.tax_amount,
      /*"sub_total": order.sub_total,*/
      "shipping": order.shipping_amount,
      "email": order.orderAddress[0].email,
      "phone": order.orderAddress[0].phone
      }
     };
     // console.log('Gevent', GaEvent);
    this.dataLayerService.logCustomDataEvent(GaEvent);
    this.dataLayerService.logRevenueEvent(order.grand_total);

    /*const GaEvent1 = {
      'event':'conversion',
      'conversion': {
        'send_to': 'AW-962887714/sISWCPLZgK0ZEKKAkssD',
        'value': order.grand_total,
        'currency': 'AED',
        'transaction_id': (order.transaction_id) ? order.transaction_id : ''
    }
     };
     this.dataLayerService.logCustomDataEvent(GaEvent1);*/
    /*this.dataLayerService.trackEvent(order.grand_total, order.transaction_id);*/
  }
}
