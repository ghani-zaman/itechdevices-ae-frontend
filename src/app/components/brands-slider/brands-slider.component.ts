import { Component, ViewEncapsulation, OnInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { WebsiteService } from 'src/app/services/website.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@Component({
  selector: 'app-brands-slider',
  templateUrl: './brands-slider.component.html',
  styleUrls: ['./brands-slider.component.css'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LazyLoadImageModule]
})
export class BrandsSliderComponent implements OnInit {
  imagePath = environment.imagesPath + 'Images/Brands/';
   /* config: any = {
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true
    },
    centeredSlides: false,
    breakpoints: {
      1024: {
        slidesPerView: 6,
        spaceBetween: 10
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      400: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      300: {
        slidesPerView: 2,
        spaceBetween: 10
      }
    },
    navigation: true,
    loop: true
  };*/
  data: any = [];
  loading = false;
  options = {
    1440: {
      slidesPerView: 9,

      spaceBetween: 10
    },
    991: {
      slidesPerView: 8,

      spaceBetween: 10
    },
    767: {
      slidesPerView: 6,

      spaceBetween: 10
    },
    575: {
      slidesPerView: 4,

      spaceBetween: 10
    },
    300: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  };
  constructor(
    private websiteService: WebsiteService
  ) { }

  ngOnInit(): void {

    this.getFeaturedCategories();
  }
  trackByMethod(index: number, el: any): string {
    return el.brand_id;
  }
  async getFeaturedCategories(): Promise<void> {
    try {
      this.data =  this.websiteService.getFeaturedBrands() || [];
      // // console.log(this.data);
    }catch (err) {
      this.data = [];
      this.loading = false;
    }
  }
}
