import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-rfq-thank-you',
  templateUrl: './rfq-thank-you.component.html',
  styleUrls: ['./rfq-thank-you.component.css']
})
export class RfqThankYou implements OnInit {

  constructor(
    private seo: SEOService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Quote Request Received');
    this.seo.logZendeskEvent();
  }

}
