import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-simple-checkout',
  templateUrl: './simple-checkout.component.html',
  styleUrls: ['./simple-checkout.component.sass']
})
export class SimpleCheckoutComponent implements OnInit {

  cart: any;
  cartloading = false;
  placingorder = false;
  checkoutForm: UntypedFormGroup;
  formcreated = false;
  isGuest = true;
  countriesList = [];
  orderid = null;
  cartCount = 0;
  shippingAddresses = [];
  billingAddresses = [];
  loadshipping = false;
  shippingMethods = [];
  loadbillform = false;
  constructor(
    private cartService: CartService,
    private toast: MyToastService,
    private userService: UserService,
    private builder: UntypedFormBuilder,
    private orderService: OrderService,
    private router: Router,
    private arouter: ActivatedRoute
  ) {
    this.countriesList = environment.countriesList;
  }

  async ngOnInit(): Promise<void> {
    await this.getUserInfo();
    await this.getcart();
  }

  gotoLogin(): void {
    this.router.navigate(['/user/login'], { queryParams: { returnUrl: this.router.url }});
  }

  async getUserInfo(): Promise<void> {
    try{
      const isAuthenticated = await this.userService.isAuthenticated();
      if (isAuthenticated) {
        this.isGuest = false;
        this.createUserCheckOutForm();
        this.shippingAddresses = await this.userService.getAllUserAddresses('shipping');
        this.billingAddresses = await this.userService.getAllUserAddresses('billing');
      } else {
        this.isGuest = true;
        this.createGuestCheckOutForm();
      }
    }catch (err){
      this.isGuest = true;
      this.createGuestCheckOutForm();
    }
  }

  selectShippingAddress(event) {
    const index = event.target.value;
    if(index === 'novalue') {
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
      this.checkoutForm.controls.first_name.setValue(this.shippingAddresses[index].first_name);
      this.checkoutForm.controls.last_name.setValue(this.shippingAddresses[index].last_name);
      this.checkoutForm.controls.company_name.setValue(this.shippingAddresses[index].company_name);
      this.checkoutForm.controls.phone.setValue(this.shippingAddresses[index].phone);
      this.checkoutForm.controls.street_address1.setValue(this.shippingAddresses[index].street_address1);
      this.checkoutForm.controls.city.setValue(this.shippingAddresses[index].city);
      this.checkoutForm.controls.state.setValue(this.shippingAddresses[index].state);
      this.checkoutForm.controls.country.setValue(this.shippingAddresses[index].country);
      this.checkoutForm.controls.zip.setValue(this.shippingAddresses[index].zip);
    }
    this.calculateShipping();
  }
  selectBillingAddress(event) {

    const index = event.target.value;
    if(index === 'novalue') {
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
      this.checkoutForm.controls.bfirst_name.setValue(this.billingAddresses[index].first_name);
      this.checkoutForm.controls.blast_name.setValue(this.billingAddresses[index].last_name);
      this.checkoutForm.controls.bcompany_name.setValue(this.billingAddresses[index].company_name);
      this.checkoutForm.controls.bphone.setValue(this.billingAddresses[index].phone);
      this.checkoutForm.controls.bstreet_address1.setValue(this.billingAddresses[index].street_address1);
      this.checkoutForm.controls.bcity.setValue(this.billingAddresses[index].city);
      this.checkoutForm.controls.bstate.setValue(this.billingAddresses[index].state);
      this.checkoutForm.controls.bcountry.setValue(this.billingAddresses[index].country);
      this.checkoutForm.controls.bzip.setValue(this.billingAddresses[index].zip);
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
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      country: [null, [Validators.required]],
      bemail: [null, [Validators.required, Validators.email]],
      bfirst_name: [null, [Validators.required]],
      blast_name: [null, [Validators.required]],
      bcompany_name: [null, []],
      bphone: [null, [Validators.required]],
      bstreet_address1: [null, [Validators.required]],
      bcity: [null, [Validators.required]],
      bstate: [null, [Validators.required]],
      bzip: [null, [Validators.required]],
      bcountry: [null, [Validators.required]],
      cartid: [null, [Validators.required]],
      use_shipping_as_billing: [false],
      shipping_method: [null, [Validators.required]],
      shipping_method_code: [null, [Validators.required]],
      shipping_date: [null],
      shipping_amount: [null, [Validators.required]],
      payment_method: ['banktransfer', [Validators.required]]
    });
    this.formcreated = true;
  }

  changeBillShip(event): void {
    this.loadbillform = true;
    if (!event.currentTarget.checked) {
      if (this.isGuest) {
        this.checkoutForm.addControl('bemail', new UntypedFormControl(null, [Validators.required, Validators.email]));
      } else {
        this.checkoutForm.addControl('baddressid', new UntypedFormControl('novalue', []));
      }
      this.checkoutForm.addControl('bfirst_name', new UntypedFormControl(null, [Validators.required]));
      this.checkoutForm.addControl('blast_name', new UntypedFormControl(null, [Validators.required]));
      this.checkoutForm.addControl('bcompany_name', new UntypedFormControl(null, []));
      this.checkoutForm.addControl('bphone', new UntypedFormControl(null, [Validators.required]));
      this.checkoutForm.addControl('bcity', new UntypedFormControl(null, [Validators.required]));
      this.checkoutForm.addControl('bstate', new UntypedFormControl(null, [Validators.required]));
      this.checkoutForm.addControl('bzip', new UntypedFormControl(null, [Validators.required]));
      this.checkoutForm.addControl('bstreet_address1', new UntypedFormControl(null, [Validators.required]));
      this.checkoutForm.addControl('bcountry', new UntypedFormControl(null, [Validators.required]));


    } else {
      if  (this.checkoutForm.controls.bemail) {
      this.checkoutForm.removeControl('bemail');
      }
      if  (this.checkoutForm.controls.bemail) {
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
    // // console.log(this.checkoutForm.controls);
  }

  createUserCheckOutForm(): void {
    this.checkoutForm = this.builder.group({
      addressid: ['novalue', []],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      company_name: [null, []],
      phone: [null, [Validators.required]],
      street_address1: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      country: [null, [Validators.required]],
      baddressid: ['novalue', []],
      bfirst_name: [null, [Validators.required]],
      blast_name: [null, [Validators.required]],
      bcompany_name: [null, []],
      bphone: [null, [Validators.required]],
      bstreet_address1: [null, [Validators.required]],
      bcity: [null, [Validators.required]],
      bstate: [null, [Validators.required]],
      bzip: [null, [Validators.required]],
      bcountry: [null, [Validators.required]],
      cartid: [null, [Validators.required]],
      use_shipping_as_billing: [false],
      shipping_method: [null, [Validators.required]],
      shipping_method_code: [null, [Validators.required]],
      shipping_date: [null],
      shipping_amount: [null, [Validators.required]],
      payment_method: ['banktransfer', [Validators.required]]
    });
    this.formcreated = true;
  }

  async getcart(): Promise<void> {
    try {
      this.cartloading = true;
      const cartData = await this.cartService.getFullcartList().toPromise();
      if (cartData) {
        this.cart = cartData.data;
        if (this.cart.products.length === 0) {
          this.router.navigate(['/']);
          this.toast.error('Your cart is empty');
        }
        this.checkoutForm.controls.cartid.setValue(this.cart.cart_id);
      } else {
        this.router.navigate(['/']);
        this.toast.error('Your cart is empty');
      }
      // // console.log('cart', this.cart);
      this.cartloading = false;
    }catch (err) {
      this.cartloading = false;
    }
  }
  selectShippingMethod(event) {
    const data = event.target.value;
    // console.log(data);
    if(data == 'novalue') {
      this.checkoutForm.controls.shipping_method_code.setValue(null);
      this.checkoutForm.controls.shipping_amount.setValue(null);
      this.checkoutForm.controls.shipping_date.setValue(null);
    } else {
      this.checkoutForm.controls.shipping_method_code.setValue(this.shippingMethods[data].serviceType);
      this.checkoutForm.controls.shipping_amount.setValue(this.shippingMethods[data].cost);
      this.checkoutForm.controls.shipping_date.setValue(this.shippingMethods[data].deliveryDate);
    }
  }
  async calculateShipping(): Promise<void> {
    const shippingPincode = this.checkoutForm.controls.zip.value;
    const shippingCountry = this.checkoutForm.controls.country.value;
    if(!shippingCountry || shippingCountry == null || !shippingPincode || shippingPincode==null || shippingPincode == '') {
      return;
    }
    try {
      this.loadshipping = true;
      if(this.checkoutForm.controls.addressid){
      this.checkoutForm.controls.addressid.disable();
      }
      this.checkoutForm.controls.zip.disable();
      this.checkoutForm.controls.country.disable();
      this.shippingMethods = [];
      let res: any;
      if(shippingCountry == 'US') {
        res = await this.orderService.getDomesticRates({
          cartid: this.cart.cart_id,
          pincode: shippingPincode,
          country: shippingCountry
        });

      } else {
        res = await this.orderService.getInternationalRates({
          cartid: this.cart.cart_id,
          pincode: shippingPincode,
          country: shippingCountry
        });
      }
      this.shippingMethods = res;

      if(this.checkoutForm.controls.addressid){
        this.checkoutForm.controls.addressid.enable();
        }
        this.checkoutForm.controls.zip.enable();
        this.checkoutForm.controls.country.enable();
      this.loadshipping = false;
    } catch(err) {
      this.shippingMethods = [];
      if(this.checkoutForm.controls.addressid){
        this.checkoutForm.controls.addressid.enable();
        }
        this.checkoutForm.controls.zip.enable();
        this.checkoutForm.controls.country.enable();
      this.loadshipping = false;
    }
     // // console.log(this.cart);
  }

  async submitForm(form): Promise<any> {
    if (form.invalid) {
      return false;
    }
    try{
      this.placingorder = true;
      const order = await this.orderService.addOrder(form.value).toPromise();
      if (order) {
        await this.cartService.calculateCartTotal();
      }
      this.orderid = order.data.order_id;
      if (this.checkoutForm.controls.payment_method.value === 'paytrace') {
        this.router.navigate(['/checkout/payment/' + this.orderid]);
      }
      this.placingorder = false;
    }catch (err) {
      this.placingorder = false;
      this.orderid = null;
      this.toast.error('Unable to place order');
    }
  }

}
