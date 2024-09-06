import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-product-availability',
  templateUrl: './product-availability.component.html',
  styleUrls: ['./product-availability.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ]
})
export class ProductAvailability implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'Product Availability | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Discover up-to-date IT hardware availability at the store. Fast dispatch for in-stock items, options for express & split shipping, and essential order info.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
