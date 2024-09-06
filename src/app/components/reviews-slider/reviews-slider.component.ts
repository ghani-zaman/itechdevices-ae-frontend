import { Renderer2, Component, ViewEncapsulation, OnInit, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RxFor } from '@rx-angular/template/for';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { WebsiteService } from 'src/app/services/website.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
declare var window: any;


@Component({
  selector: 'app-reviews-slider',
  templateUrl: './reviews-slider.component.html',
  styleUrls: ['./reviews-slider.component.css'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [RxFor, CommonModule, PipesModule, StarRatingComponent],
  host: {ngSkipHydration: 'true'},
})
export class ReviewsSliderComponent implements OnInit{
  loading: boolean = false;
  reviews: any = {siteinfo: null, reviews: null};
  styles =
    `
      .swiper-button-next,
      .swiper-button-prev {
        background-color: white;
        padding: 8px 16px;
        border-radius: 100%;
        border: 2px solid black;
        color: red;
      }
      .swiper-pagination-bullet{
        width: 40px;
        height: 40px;
        background-color: red;
      }
  `;
  options = {

    1200: {
      slidesPerView: 5,

      spaceBetween: 10
    },
    1100: {
      slidesPerView: 4,

      spaceBetween: 10
    },
    1050: {
      slidesPerView: 3,

      spaceBetween: 10
    },
    850: {
      slidesPerView: 2,

      spaceBetween: 10
    },
    600: {
      slidesPerView: 1,

      spaceBetween: 10
    },
  };
  constructor(private webService: WebsiteService) {

  }
  async ngOnInit(): Promise<void> {
    try{
      this.loading = true;
      const data = await this.webService.getShopperApprovedReviews();
      if(data) {
        this.reviews = data;
        //console.log('reviews',  this.reviews);
      }
      this.loading = false;
    }catch(e) {
      this.loading = false;
    }
  }
}
/*
//
export class ReviewsSliderComponent implements OnInit, AfterViewInit {
  reviews = [];
  isBrowser = false;
  options = {
    1920: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    1600: {
      slidesPerView: 4,
      spaceBetween: 10
    },
   1100: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10
    },

  };


  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId,
    private renderer2: Renderer2
  ) {
    this.reviews = [
      {
        name: 'Muriel Marsh',
        title: 'Love my new graphic card',
        content: ` Love my new graphic card! I was so nervous about its compatibility with my custom PC build but it worked
        like charm. Couldn’t be happier! I would like to give a shoutout to Alex for being a tech guru!!
      `
      },
      {
        name: 'Otis Sandoval',
        title: 'Good quality products',
        content: ` Good quality products, products always in stock, and cost-effective. I have set up Memory Clearance as
        my regular vendor to look after my inventory for computer components for one of my companies. Thank you
      `
      },
      {
        name: 'Eza Dora',
        title: 'Best shopping experience ever',
        content: `Best shopping experience ever. I bought two 8GB DIMMs from memory clearance which they shipped without
        any delays. Recommended for everyone who wants to explore the overwhelming collection of different
        hardware items and buy the one which is hard to find anywhere else. Memory Clearance is featuring almost
        everything in each product category.`
      },
      {
        name: 'Wilson J.',
        title: 'est supplier for end of life server…',
        content: `Best supplier for end of life server memory!! Always find a product that I couldn't on other portal.`
      },
      {
        name: 'Emma',
        title: '10/10 for the order fulfillment of 20+…',
        content: `10/10 for the order fulfillment of 20+ Network servers and that too on time. Had a great overall
        experience in terms of price structures, responsiveness, and punctuality.`
      },
      {
        name: 'Olivia Burgess',
        title: 'I ordered Samsung’s 4GB DDR4 RAM',
        content: `I ordered Samsung’s 4GB DDR4 RAM. They mistakenly delivered 8GB. Their customer service was so
        responsive and I had my hands on the right product within no time.`
      },
      {
        name: 'Michael Sears',
        title: 'Got a Cisco switch from them',
        content: `Got a Cisco switch from them. It’s 100% genuine and was delivered safely and on time.`
      },

      {
        name: 'James Lyons',
        title: 'My order for a processor (model details…',
        content: `My order for a processor (model details = 338-BGHX - Dell 2.10GHz 7.2GT/s QPI 15MB L3 Cache Socket
        FCLGA-2011 Intel Xeon E5-2620 V2 6-Core) have just been received. It is from a company with the name of
        Memory Clearance. I like my stuff and will leave another review about its performance soon enough.`
      },


    ]

  }
  slides$ = new BehaviorSubject<string[]>(['']);
  ngOnInit(): void {
    this.slides$.next(
      Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`)
    );


  }
  ngAfterViewInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      let exist = this._document.getElementById('shopper-approved');
      if(exist != null) {
        exist.remove();
      }
      setTimeout(() => {
        let script1 = this.renderer2.createElement('script');
        script1.type = 'text/javascript';
        script1.id = 'shopper-approved';
        script1.async = true;
        script1.src = '/shopperapproved.js';
        this.renderer2.appendChild(this._document.body, script1);

      }, 100)


    }

  }

}*/
