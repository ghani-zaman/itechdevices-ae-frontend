import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { WebsiteService } from 'src/app/services/website.service';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  //host: { ngSkipHydration: 'true' },
  imports: [
    CommonModule,
    NgbNavModule,
    PipesModule,
    RouterModule,
    LazyLoadImageModule,

  ],
})
export class FeaturedProductsComponent implements OnInit {
  config: any = {
    autoHeight: false,
    allowTouchMove: true,
    initialSlide: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
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
      },
    },
    navigation: true,
    pagination: {
      clickable: true,
    },
    loop: true,
  };

  activeTab = 0;
  data: any;
  loading = false;
  isBrowser = false;
  env = environment;
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor(
    private websiteService: WebsiteService,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    //if (this.isBrowser) {
      this.getTopSellingCategories();
    //}
  }

  makeCall() {
    if (this.isBrowser) {
    window.location.href = 'tel:+971-5-54255786';
    }
  }

  async getTopSellingCategories(): Promise<void> {
    try {
      this.data = this.websiteService.getTopSellingCategories() || [];
      // console.log(this.data);
      /* if (!this.data) {
        this.data = [];
      }*/
    } catch (err) {
      this.data = [];
      this.loading = false;
    }
  }
  trackByMethod(index: number, el: any): string {
    return el.id;
  }
}
