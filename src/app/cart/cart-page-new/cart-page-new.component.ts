import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { bounceInOnEnterAnimation, fadeInOnEnterAnimation, slideOutLeftAnimation, zoomInDownOnEnterAnimation } from 'angular-animations';
import { CartService } from 'src/app/services/cart.service';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { SEOService } from 'src/app/services/seo.service';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cart-page-new',
  templateUrl: './cart-page-new.component.html',
  styleUrls: ['./cart-page-new.component.css'],
  animations: [
    fadeInOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100 }),
    slideOutLeftAnimation({anchor: 'delcart'})
  ]
})
export class CartPageNewComponent implements OnInit {
  cart: any = null;
  cartload = false;
  updating = false;
  deleting  = false;
  twdisc = 0;
  zipCode: any = null;
  contryList = environment.countriesList;
  taxPer = environment.taxPercent;
  country: any = 'US';
  loadshipping = false;
  shippingMethods: any = [];
  selectedShippingMethod: any = null;
  user = null;
  constructor(
    private cartService: CartService,
    private toast: MyToastService,
    private router: Router,
    private title: Title,
    private seoService: SEOService,
    private dataLayerService: DataLayerService,
    private websiteService: WebsiteService,
    private orderService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.getCart();
    const meta_title = 'Shopping Cart';
    this.title.setTitle(meta_title);
    this.seoService.logZendeskEvent();
  }

  gotoCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  async getCart(): Promise<void> {
    try {
      this.cartload = true;
      const cartdata = await this.cartService.getFullcartList().toPromise();
      this.cart = cartdata.data;
      this.calculateDiscountPrice(this.cart.products);
      this.fireGtmEvent();
      this.cartload = false;
    } catch (err) {
      this.cart = null;
      this.cartload = false;
    }

  }

  fireGtmEvent() {
    if(this.cart.products.length > 0){
      const items: any = [];
      for(let i = 0; i < this.cart.products.length; i++) {
       items[i] = {
        "item_id": this.cart.products[i].id,
        "item_variant": this.cart.products[i].sku,
        "item_name": this.cart.products[i].title,
        "price": this.cart.products[i][this.cart.products[i].condition],
        "item_brand": this.cart.products[i].brand_name,
        "item_category": this.cart.products[i].category_name,
        "quantity": this.cart.products[i].qty,
        "index": 0
        };
      }
      const GaEvent = {
        "event": "view_cart",
        "ecommerce": {
        "items": items,
        "currency": "AED",
        "value":this.cart.total_amount
        }
       };
      this.dataLayerService.logCustomDataEvent(GaEvent)
    }

    ;
  }

  async updateQuantity(quantity: number, index): Promise<void> {
    if (quantity === -1) {
      if (this.cart.products[index].qty === 1){
        return;
      }
    }
    this.cart.products[index].qty = this.cart.products[index].qty + quantity;
    if(quantity === -1) {
      this.removeCartGaEvent(this.cart.products[index]);
    } else{
      console.log(this.cart.products[index])
      this.cartService.addProductGaEvent(this.cart.products[index], this.cart.products[index].condition, false)
    }
    await this.updateCart();
  }

  async removeProduct(index): Promise<void>{
    /*if (this.cart.products.length === 1 ){
      this.toast.error('Cannot remove last product from cart.');
      return;
    }*/
    this.removeCartGaEvent(this.cart.products[index]);
    this.cart.products.splice(index, 1);
    await this.updateCart();
  }

  removeCartGaEvent(product) {
    const GaEvent = {
      "event": "remove_from_cart",
      "ecommerce": {
      "items": [{
      "item_id": product.id,
      "item_variant": product?.sku,
      "item_name": product.title,
      "price": product[product.condition],
      "item_brand": product.brand_name,
      "item_category": product.category_name,
      "quantity": product.qty,
      "index": 0
      }],
      "currency": "AED",
      "value":product[product.condition] * product.qty
      }
     };
    this.dataLayerService.logCustomDataEvent(GaEvent);
  }

  async checkQty() {
    if(this.cart.products.length > 0){
      for(let i = 0; i < this.cart.products.length; i++) {
        if(this.cart.products[i].qty < 1) {
          this.cart.products[i].qty = 1

        }
      }

    }

  }

  async updateCart(): Promise<void> {
    await this.checkQty()
    try {
      if (this.cart.products.length === 0 ){
        await this.emptyCart();
        return;
      }
      this.updating = true;
      await this.cartService.updateCart(this.cart).toPromise();
      const cartdata = await this.cartService.getFullcartList().toPromise();
      if (cartdata) {
      this.cart = cartdata.data;
      this.calculateDiscountPrice(this.cart.products);
      this.cartService.updatecalculateCartTotal(this.cart.products);
      }
      this.updating = false;
    } catch (err) {
      this.cart = null;
      this.updating = false;
    }

  }

  async emptyCart(): Promise<void> {
    try {
      this.deleting = true;
      if(this.cart.products.length && this.cart.products.length > 0) {
        for(let i = 0; i<this.cart.products.length; i++) {
          this.removeCartGaEvent(this.cart.products[i]);
        }
      }
      await this.cartService.deleteCart().toPromise();
      const cartdata = await this.cartService.getFullcartList().toPromise();
      if (cartdata) {
      this.cart = cartdata.data;
      this.cartService.updatecalculateCartTotal(this.cart.products);
      this.calculateDiscountPrice(this.cart?.products);
      }
      this.deleting = false;
    } catch (err) {
      this.cart = null;
      this.deleting = false;
    }

  }

  async calculateDiscountPrice(cart) {
    const data = cart;
    let totalWithoutDiscount = 0;
    /*if (data) {
      for (const p of cart) {
        totalWithoutDiscount = totalWithoutDiscount + (((p[p.condition] *100)/(100-p.discount))*p.qty);
      }
    }*/
    this.twdisc = totalWithoutDiscount;
  }

  async calculateShipping(): Promise<void> {
    const shippingPincode = this.zipCode;
    const shippingCountry = this.country;
    this.selectedShippingMethod = null;
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
      // this.dataLayerService.logCustomDataEvent({event: 'add_shipping_info'});
      const shipMethod$: any = await this.websiteService.getWebsiteShippingMethod().toPromise();
      const shipMethod = shipMethod$.data;

      this.shippingMethods = [];
      if (true || (shipMethod?.fedex &&
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

      } else {
        this.shippingMethods = [];
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

      this.loadshipping = false;
      // console.log('shipping', this.shippingMethods);
    } catch (err) {
      this.shippingMethods = [];


      this.loadshipping = false;
    }
    // // console.log(this.cart);
  }

  selectMethod(event: any) {
    console.log(event.target.value);
    this.selectedShippingMethod = event.target.value;
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      this.calculateShipping();
      // Your logic for Enter key
    }
  }


}
