import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';

import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-part-number-identification',
  templateUrl: './part-number-identification.component.html',
  styleUrls: ['./part-number-identification.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule
  ]
})
export class PartNumberIdentification implements OnInit {

  constructor(private title: Title, private meta: Meta,  private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'Part Number Identification | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Effortlessly identify IT hardware part numbers with our guide. Ensure compatibility and authenticity for Dell, HP, IBM, Toshiba, and more. Shop confidently now!' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL()
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
