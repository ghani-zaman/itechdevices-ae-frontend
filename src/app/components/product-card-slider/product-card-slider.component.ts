import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CartService } from 'src/app/services/cart.service';
import { ComparelistService } from 'src/app/services/comparelist.service';
import { MyToastService } from 'src/app/services/my-toast.service';

@Component({
  selector: 'app-product-card-slider',
  templateUrl: './product-card-slider.component.html',
  styleUrls: ['./product-card-slider.component.css'],
  standalone: true,
  imports: [CommonModule, PipesModule]
})
export class ProductCardSliderComponent implements OnInit {
  @Input() product: any = null;
  cartLoading = -1;
  compLoading = -1;
  constructor(private router: Router, private cartService: CartService, private compare: ComparelistService, private toast: MyToastService) { }

  ngOnInit(): void {
    // console.log('pproduct', this.product);
    // this.owlConfig.responsive = this.lineItems;
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

  async addToCompare(prod, cond): Promise<void> {
    this.compLoading = prod.id;
    try {
      prod.condition = cond;
      const complist = await this.compare
        .addProducts(prod)
        .toPromise();
      if (complist) {
        this.compare.updateComparelist(complist.data);
        this.toast.success('Product added to compare list');
      }
      this.compLoading = -1;
    } catch (err) {
      //  // console.log(err);
      this.toast.error('Unable to add product');
      this.compLoading = -1;
    }
  }

}
