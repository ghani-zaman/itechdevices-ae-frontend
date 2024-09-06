import { RESPONSE } from '../../../express.tokens'
import { Component, OnInit, Inject, Optional } from '@angular/core'
import { Response } from 'express'
import { WebsiteService } from 'src/app/services/website.service';

import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  data: any = [];
  private response: Response;
  loading =  false;
  constructor(@Optional() @Inject(RESPONSE) response: any, private websiteService: WebsiteService, private title: Title, private meta: Meta, private seo: SEOService) {
    this.response = response;
  }

  ngOnInit() {
    const seoTitle = '404 Products not Found | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Discover Itech Devices: Your trusted source for a comprehensive range of IT hardware. Specializing in tailored solutions for businesses and data centers.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
    // console.log('here with response', this.response);
    if (this.response) {
      // response will only be if we have express
      // this.response.statusCode = 404;
      this.response.status(404);
    }
    this.getTopSellingCategories();
  }

  async getTopSellingCategories(): Promise<void> {
    try {
      this.loading =  true;
      this.data = this.websiteService.getTopSellingCategories() || [];
      this.loading =  false;

     /* if (!this.data) {
        this.data = [];
      }*/
    }catch (err) {
      this.data = [];
      this.loading = false;
    }
  }

}
