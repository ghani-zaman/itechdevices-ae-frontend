import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/services/website.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { RxFor } from '@rx-angular/template/for';
import { SharedModule } from 'src/app/shared.module';



@Component({
  selector: 'app-top-brands',
  templateUrl: './top-brands.component.html',
  styleUrls: ['./top-brands.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, RxFor, SharedModule]
})
export class TopBrandsComponent implements OnInit {
  imagePath = environment.imagesPath + 'Images/Brands/';
  /*config: SwiperOptions = {
    autoHeight: false,
    allowTouchMove: true,
    autoplay: {
      delay: 1000,
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
  navigation = true;
  options = {
    1024: {
      slidesPerView: 6,

      spaceBetween: 20
    },
    500: {
      slidesPerView: 3,

      spaceBetween: 20
    },
    400: {
      slidesPerView: 3,

      spaceBetween: 20
    },
    300: {
      slidesPerView: 2,

      spaceBetween: 20
    }
  };
  constructor(
    private websiteService: WebsiteService
  ) { }

  ngOnInit(): void {

    this.getFeaturedCategories();
  }

  async getFeaturedCategories(): Promise<void> {
    try {
      this.loading = true;
      this.data = await this.websiteService.getFeaturedBrands();
      // // console.log(this.data);
      if (!this.data) {
        this.data = [];
      }
      this.loading = false;
    }catch (err) {
      this.data = [];
      this.loading = false;
    }

}

}

