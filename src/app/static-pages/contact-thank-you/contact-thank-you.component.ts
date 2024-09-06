import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-contact-thank-you',
  templateUrl: './contact-thank-you.component.html',
  styleUrls: ['./contact-thank-you.component.css']
})
export class ContactThankYou implements OnInit {

  constructor(
    private seo: SEOService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Thankyou for contacting us');
    this.seo.logZendeskEvent();
  }
}
