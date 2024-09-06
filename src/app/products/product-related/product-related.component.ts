import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';


@Component({
  standalone: true,
  selector: 'app-product-related',
  templateUrl: './product-related.component.html',
  styleUrls: ['./product-related.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductRelatedComponent implements OnInit {
  @Input() products = []
  /*config: SwiperOptions = {
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 1,
      },
      400: {
        slidesPerView: 1,
      },
      300: {
        slidesPerView: 1,
      }
    },
    navigation: true,
    pagination: {
      clickable: true
    },
    loop: true
  };*/
  constructor() { }

  ngOnInit(): void {
  }

}
