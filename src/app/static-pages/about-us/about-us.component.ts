import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';

import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ]
})
export class AboutUsComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'About Us | iTech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Learn more about iTechDevice.ae, your trusted source for IT devices and accessories. Discover our mission, values, and commitment to quality service.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
