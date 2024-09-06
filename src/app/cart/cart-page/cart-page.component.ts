import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bounceInOnEnterAnimation, fadeInOnEnterAnimation, slideOutLeftAnimation, zoomInDownOnEnterAnimation } from 'angular-animations';
import { CartService } from 'src/app/services/cart.service';
import { MyToastService } from 'src/app/services/my-toast.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.sass'],
  animations: [
    fadeInOnEnterAnimation({ anchor: 'enter', duration: 1000, delay: 100 }),
    slideOutLeftAnimation({anchor: 'delcart'})
  ]
})
export class CartPageComponent implements OnInit {
  cart: any = null;
  cartload = false;
  updating = false;
  deleting  = false;
  constructor(
    private cartService: CartService,
    private toast: MyToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  gotoCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  async getCart(): Promise<void> {
    try {
      this.cartload = true;
      const cartdata = await this.cartService.getFullcartList().toPromise();
      this.cart = cartdata.data;
      this.cartload = false;
    } catch (err) {
      this.cart = null;
      this.cartload = false;
    }
  }

  async updateQuantity(quantity: number, index): Promise<void> {
    if (quantity === -1) {
      if (this.cart.products[index].qty === 1){
        return;
      }
    }
    this.cart.products[index].qty = this.cart.products[index].qty + quantity;
    await this.updateCart();
  }

  async removeProduct(index): Promise<void>{
    if (this.cart.products.length === 1 ){
      await this.emptyCart()
      // this.toast.error('Cannot remove last product from cart.');
      return;
    }
    this.cart.products.splice(index, 1);
    await this.updateCart();
  }
  async checkQty() {
    if(this.cart.products.length > 0){
      for(let i = 0; i < this.cart.products.length; i++) {
        if(this.cart.products[i].qty < 1) {
          this.toast.error('Minimum quantity for product is 1');
          return false;
        }
      }
      return true;
    }
    return false;
  }
  async updateCart(): Promise<void> {
    const check = await this.checkQty();
    console.log(check);
    if(!check) return;
    try {
      this.updating = true;
      const cartdata = await this.cartService.updateCart(this.cart).toPromise();
      if (cartdata) {
      this.cart = cartdata.data;
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
      const cartdata = await this.cartService.deleteCart().toPromise();
      if (cartdata) {
      this.cart = cartdata.data;
      this.cartService.updatecalculateCartTotal(this.cart.products);
      }
      this.deleting = false;
    } catch (err) {
      this.cart = null;
      this.deleting = false;
    }
  }

}
