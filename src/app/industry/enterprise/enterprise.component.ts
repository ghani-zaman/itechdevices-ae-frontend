import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'Enterprise Business | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Optimize your business infrastructure with tailored, cutting-edge IT hardware solutions for enterprise businesses. Explore now and enhance efficiency today!' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
