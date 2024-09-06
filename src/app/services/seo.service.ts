import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare const $zopim: any;
@Injectable({
   providedIn: 'root'
})
export class SEOService {
  siteUrl: string = environment.siteUrl;
  constructor(@Inject(DOCUMENT) private dom, private title: Title, private router: Router) {
  }
  createCanonicalURL() {
    let link : HTMLLinkElement = null;
    link = this.dom.getElementById('canTag');
    if(link != null) {

      const url: string = this.dom.URL;
      const split = url.split('?');
      link.setAttribute('href', split[0].replace('http://', 'https://'));
    } else {
      link = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('id','canTag');
      this.dom.head.appendChild(link);
      const url: string = this.dom.URL;
      const split = url.split('?');
      link.setAttribute('href', split[0].replace('http://', 'https://'));
    }
 }
 removeCanonical() {
  let link : HTMLLinkElement = null;

    link = this.dom.getElementById('canTag');
  if(link != null) {
    link.remove();
  }
 }
 logZendeskEvent() {
  const ftitle = (this.title.getTitle()) ? this.title.getTitle(): '';
  const url  = (this.router.url) ? this.router.url : '/';
  const fullUrl = this.siteUrl + url;
  // console.log(ftitle);
  if(typeof($zopim) != 'undefined' && $zopim.livechat){
    // console.log('zendesk fired');
    $zopim.livechat.sendVisitorPath({
      url: fullUrl,
      title: ftitle
    });
  }
 }
}

