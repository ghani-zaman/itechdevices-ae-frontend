import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-product-certifications',
  templateUrl: './product-certifications.component.html',
  styleUrls: ['./product-certifications.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ]
})
export class ProductCertifications implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'Product Certifications | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Explore certified IT hardware at Itech Devices. Top-grade, reliable products with industry certifications. Shop smart, shop certified!' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
