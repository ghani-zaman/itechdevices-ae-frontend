import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-refund-policy',
  templateUrl: './refund-policy.component.html',
  styleUrls: ['./refund-policy.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ]
})
export class RefundPolicyComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'Refund Policy | iTech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Discover our Refund Policy for products purchased on iTechDevice.ae. We provide a straightforward and fair refund process for our valued customers.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
