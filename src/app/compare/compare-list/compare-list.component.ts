import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ComparelistService } from 'src/app/services/comparelist.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-compare-list',
  templateUrl: './compare-list.component.html',
  styleUrls: ['./compare-list.component.css']
})
export class CompareListComponent implements OnInit {
  products = [];
  loading = false;
  cartLoading  = -1;
  dloading = -1;
  constructor(
    private compatelist: ComparelistService,
    private cartService: CartService,
    private toast: MyToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCompareList();
  }

  async getCompareList(): Promise<void> {
    try {
      this.loading = true;
      const list = await this.compatelist.getCompareList();
      if (list) {
        this.products = list.products;
      }
      this.loading = false;
    } catch (err) {
      this.loading = false;
    }
  }
  async addToCart(prod, qty, cond): Promise<void> {
    this.cartLoading = prod.id;
    try {
      const cart = await this.cartService
        .addProduct(prod, qty, cond)
        .toPromise();
      if (cart) {
        this.cartService.updatecalculateCartTotal(cart.data);
        this.router.navigate(['/cart']);
        this.toast.success('Product added to cart');
      }
      this.cartLoading = -1;
    } catch (err) {
      this.toast.error('Unable to add product');
      this.cartLoading = -1;
    }
  }

  async deleteFromCompare(prod): Promise<void> {
    this.dloading = prod.id;
    try {
      const list = await this.compatelist.removeProduct(prod)
        .toPromise();
      if (list) {
        this.products = list.data.products;
        this.compatelist.updateComparelist(list.data);
        this.toast.success('Product removed from list');
      }
      this.dloading = -1;
    } catch (err) {
      this.toast.error('Unable to rmove product');
      this.dloading = -1;
    }
  }

}
