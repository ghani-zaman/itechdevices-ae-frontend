import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { SEOService } from 'src/app/services/seo.service';
import { SharedModule } from 'src/app/shared.module';

@Component({
  selector: 'app-rma-form',
  templateUrl: './rma-form.component.html',
  styleUrls: ['./rma-form.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ComponentsModule, SharedModule]
})
export class RmaFormComponent implements OnInit {

  constructor(private title: Title, private meta: Meta, private seo: SEOService){

  }

  ngOnInit(): void {
    const seoTitle = 'RMA Form | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Get in touch with Itech Devices for top-notch IT hardware solutions. Quick response, expert advice, and personalized service await you. RMA Form now!' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

}
