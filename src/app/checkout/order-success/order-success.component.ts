import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css',
})
export class OrderSuccessComponent implements OnInit {
  isBrowser = false;
  orderNumber = '';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId,
    private title: Title,
    private metaService: Meta,
    private seoService: SEOService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    this.title.setTitle('Order Success');
    this.seoService.logZendeskEvent();
    if (localStorage.getItem('orderSuccess')) {
      this.orderNumber = localStorage.getItem('orderSuccess');
    }

  }
}
