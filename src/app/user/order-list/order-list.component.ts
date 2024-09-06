import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

  sortBy = 'id';
  sortOrder = 'desc';
  page = 1;
  limit = environment.pageSize;
  orders: any;
  ordersloading = false;
  countryList = environment.countriesList;
  keyword = '';
  constructor(
    private orderService: OrderService,
    private title: Title,
    private meta: Meta,
    private seo: SEOService
  ) { }

  ngOnInit(): void {
    this.getOrderList();
    const seoTitle = 'Order History | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Itech Devices helps into your Order History with our intuitive dashboard for a hassle-free experience.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

  async getOrderList(): Promise<void>{
    try {
      this.ordersloading = true;
      const data = {
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
        limit: this.limit,
        page: this.page,
        keyword: this.keyword
      };
      const orderData = await this.orderService.getMyOrdersList(data).toPromise();
      this.orders = orderData.data;
      this.ordersloading = false;
    } catch (err) {
      this.ordersloading = false;
    }
  }
  changePage(cpage): void {
    this.page = cpage;
    this.getOrderList();
  }

}
