import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RxFor } from '@rx-angular/template/for';
import { CartService } from 'src/app/services/cart.service';
import { ComparelistService } from 'src/app/services/comparelist.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { ProductCardSliderComponent } from '../product-card-slider/product-card-slider.component';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, RxFor, ProductCardSliderComponent, RouterLink]
})
export class ProductCarouselComponent implements OnInit {
  @Input() products: any = [];
  @Input() title: any = 'Similar Parts';

  /*config: SwiperOptions = {
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 5,
      },
      500: {
        slidesPerView: 4,
      },
      400: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 1,
      }
    },
    navigation: true,
    pagination: {
      clickable: true
    },
    loop: true,
    slidesPerGroup: 5
  };*/
  config: any = {
    1024: {
      slidesPerView: 5,
    },
    500: {
      slidesPerView: 3,
    },
    400: {
      slidesPerView: 2,
    },
    300: {
      slidesPerView: 1,
    }
  };
  pagination: any = {
    clickable: true
  };
  cartLoading = -1;
  compLoading = -1;
  constructor(private router: Router, private cartService: CartService, private compare: ComparelistService, private toast: MyToastService) { }

  ngOnInit(): void {
    // console.log(this.products);
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
