import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ]
})
export class WarrantyComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'Warranty Info | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Explore comprehensive warranty information for top IT hardware products on our site. Secure purchases along with peace of mind are guaranteed.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
  }

}
