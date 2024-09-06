import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.sass']
})
export class WishComponent implements OnInit {
  wishlist: any = null;
  wloading = false;
  cartLoading = -1;
  deleting = -1;
  keyword = '';
  @Input() userlist = false;
  constructor(
    private wish: WishlistService,
    private cartService: CartService,
    private toast: MyToastService,
    private title: Title,
    private meta: Meta,
    private seo: SEOService
  ) { }

  ngOnInit(): void {
    this.getWishList();
    const seoTitle = 'Wish List | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Itech Devices organizes and easily manages your Wish List through our user-friendly dashboard.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

  updateQuantity(quantity: number, index): void {
    if (quantity === -1) {
      if (this.wishlist.products[index].qty === 1){
        return;
      }
    }
    this.wishlist.products[index].qty = this.wishlist.products[index].qty + quantity;
  }

  async getWishList(): Promise<void> {
    try {
      this.wloading = true;
      const list = await this.wish.getWishList(this.keyword);
      if (list) {
        // console.log(list);
        this.wishlist = list;
      }
      this.wloading = false;
    }catch (e) {
      this.wloading = false;
    }
  }
  async addToCart(prod): Promise<void> {
    this.cartLoading = prod.id;
    try {
      const cart = await this.cartService
        .addProduct(prod, prod.qty, prod.condition)
        .toPromise();
      if (cart) {
        this.cartService.updatecalculateCartTotal(cart.data);
        await this.removeFromWishList(prod);
        this.toast.success('Product added to cart');
      }
      this.cartLoading = -1;
    } catch (err) {
      this.toast.error('Unable to add product');
      this.cartLoading = -1;
    }
  }

  async removeFromWishList(product): Promise<void> {
    try {
      this.deleting = product.id;
      const data = await this.wish.removeProduct(product).toPromise();
      if (data) {
        this.wishlist = data.data;
        this.wish.updateWishlist(data.data);
      }
      this.deleting = -1;
    } catch (err) {
      this.deleting = -1;
    }
  }

}
