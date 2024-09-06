import { WishlistService } from './../../services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass']
})
export class OverviewComponent implements OnInit {
  ordersloading = false;
  orders: any = [];
  whishlist: any = null;
  constructor(
    private orderService: OrderService,
    private wishListService: WishlistService,
    private title: Title,
    private meta: Meta,
    private seo: SEOService
  ) { }

  ngOnInit(): void {
    this.getOrderList();
    this.getWishList();
    const seoTitle = 'Overview | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Itech Devices Dashboard Overview helps to monitor & manage orders in one click, and stay updated seamlessly.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }
  async getWishList(): Promise<void> {
    try {
      const resp = await this.wishListService.getWishList('');
      this.whishlist = resp;
      // console.log(this.whishlist);
    } catch (err) {
      this.whishlist = null;
    }
  }
  async getOrderList(): Promise<void>{
    try {
      this.ordersloading = true;
      const data = {
        sortBy: 'id',
        sortOrder: 'desc',
        limit: 5,
        page: 1,
      };
      const orderData = await this.orderService.getMyOrdersList(data).toPromise();
      this.orders = orderData.data;
      this.ordersloading = false;
    } catch (err) {
      this.orders = [];
      this.ordersloading = false;
    }
  }

}
