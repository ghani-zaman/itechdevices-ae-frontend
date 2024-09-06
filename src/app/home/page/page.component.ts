import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WebsiteService } from 'src/app/services/website.service';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SEOService } from 'src/app/services/seo.service';
import { environment } from 'src/environments/environment';
import { ComponentsModule } from 'src/app/components/components.module';
import { FeaturedCategoriesComponent } from 'src/app/components/featured-categories/featured-categories.component';
import { BuyNowCtaComponent } from 'src/app/components/buy-now-cta/buy-now-cta.component';
import { IndustriesSectionComponent } from 'src/app/components/industries-section/industries-section.component';
import { FullImageCtaComponent } from 'src/app/components/full-image-cta/full-image-cta.component';
import { BrandsSliderComponent } from 'src/app/components/brands-slider/brands-slider.component';
import { TopHomeSliderComponent } from 'src/app/components/top-home-slider/top-home-slider.component';
import { ReviewsSliderComponent } from 'src/app/components/reviews-slider/reviews-slider.component';
import { FeaturedProductsComponent } from 'src/app/components/featured-products/featured-products.component';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    // ComponentsModule,
    FeaturedCategoriesComponent,
    BuyNowCtaComponent,
    IndustriesSectionComponent,
    FullImageCtaComponent,
    BrandsSliderComponent,
    TopHomeSliderComponent,
    ReviewsSliderComponent,
    FeaturedProductsComponent
  ],
})
export class PageComponent implements OnInit {
  banners: any = [];
  bloading = false;
  isBrowser = false;
  jsonLd: SafeHtml;
  jsonLd1: SafeHtml;
  constructor(
    private websiteService: WebsiteService,
    private titleService: Title,
    private metaService: Meta,
    private seo: SEOService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.setSeoTags();
    //if(this.isBrowser) {

    // this.getBanners();
    this.setJsonLd();
    //}
  }

  setSeoTags(): void {
    const title =
      'Buy Computer Hardware Online in UAE | iTechDevices.ae';
    const description =
      'Shop high-quality computer hardware online in UAE at iTechDevices.ae. Explore our wide range of products, including servers, storage, networking equipment, and more. Enjoy competitive prices and fast delivery across the UAE';
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'robots', content: environment.robots });
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:type', content: 'image/jpeg' });
    this.metaService.updateTag({ property: 'og:image:alt', content: title });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({ property: 'twitter:title', content: title });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: description,
    });

    this.metaService.updateTag({
      property: 'twitter:image:alt',
      content: title,
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
  }

  async getBanners(): Promise<void> {
    try {
      this.bloading = true;
      this.banners = this.websiteService.getWebsiteBanners();
      /*const bannersx = await this.websiteService
        .getWebsiteBanners()
        .toPromise();
      if (bannersx) {
        this.banners = bannersx.data.value;
      }*/
      this.bloading = false;
    } catch (err) {
      this.bloading = false;
    }
  }
  setJsonLd() {
    const json = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      url: 'https://itechdevices.ae/',
      name: 'Itech Devices',
      logo: 'https://itechdevices.ae/',
      description:
        'Itech Devices, a Silicon Networks LLC company, is the global leader in new, pre-owned, and legacy IT hardware, offering high-quality and mission-critical equipment that has passed through robust testing and are available on market-competitive pricing. \r\n',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-866-705-5346',
          contactType: 'sales',
        },
      ],

      address: {
        addressCountry: 'United Arab Emirates',
        postalCode: '25314',
        addressRegion: 'Dubai',
        addressLocality: 'Dubai UAE 186138',
        streetAddress: 'Office 1904 Metropolis Tower -Opp Bay Square',
      },
      sameAs: [
        'https://www.facebook.com/itechdevices?utm_source=search-engine&utm_medium=google%2Fbing&utm_campaign=search-snippet&utm_id=schema&utm_term=social-icon-click&utm_content=facebook',
        'https://twitter.com/direct_hard?utm_source=search-engine&utm_medium=google%2Fbing&utm_campaign=search-snippet&utm_id=schema&utm_term=social-icon-click&utm_content=twitter',
        'https://www.instagram.com/itechdevicesglobal/?utm_source=search-engine&utm_medium=google%2Fbing&utm_campaign=search-snippet&utm_id=schema&utm_term=social-icon-click&utm_content=instagram',
        'https://www.linkedin.com/company/hard-disk-direct-global?utm_source=search-engine&utm_medium=google%2Fbing&utm_campaign=search-snippet&utm_id=schema&utm_term=social-icon-click&utm_content=linkedin',
      ],
    };
    const json1 = {
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: 'Itech Devices',
      url: 'https://itechdevices.ae/',
      potentialAction: {
        '@type': 'SearchAction',
        target:
          'https://itechdevices.ae/catalogsearch/result/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };

    this.jsonLd = this.getSafeHTML(json);
    this.jsonLd1 = this.getSafeHTML(json1);
  }

  getSafeHTML(value: {}): any {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value
      ? JSON.stringify(value, null, 2) // .replace(/\//g, '\\/')
      : '';
    const html = `<script type="application/ld+json">
    ${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
