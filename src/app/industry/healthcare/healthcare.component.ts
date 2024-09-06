import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-healthcare',
  templateUrl: './healthcare.component.html',
  styleUrls: ['./healthcare.component.css']
})
export class HealthcareComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'Healthcare  | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Streamline workflows, elevate care, and improve outcomes with Itech Devices healthcare IT solutions. Explore our expertise and unlock your potential.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
