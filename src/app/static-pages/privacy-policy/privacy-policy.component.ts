import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ]
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'Privacy Policy | iTech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Learn how iTechDevice.ae collects, uses, and protects your personal information. Our Privacy Policy ensures your data is handled with care and confidentiality.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
