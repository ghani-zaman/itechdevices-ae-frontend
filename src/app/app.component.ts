import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, OnInit, PLATFORM_ID, isDevMode } from '@angular/core';
import { Component } from '@angular/core';
/*import * as AOS from 'aos';*/
import { WebsiteService } from './services/website.service';
import { NavigationEnd, Router } from '@angular/router';
import { DataLayerService } from './services/data-layer.service';
import { environment } from 'src/environments/environment';
import { UserService } from './services/user.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'salsoftfront';
  isBrowser = false;
  constructor(
    private dataLayerService: DataLayerService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId,
    private webservice: WebsiteService,
    private userService: UserService,
    private metaService: Meta
  ) {
    this.router.events.subscribe((event) => {
      // subscribe to router events
      if (event instanceof NavigationEnd) {
        // console.log('event', environment.siteUrl + event.url);
        this.dataLayerService.logPageView(environment.siteUrl + event.url); //call our dataLayer service's page view method to ping home with the url value.
      }
    });
  }
  async ngOnInit(): Promise<void> {
    this.metaService.updateTag({ name: 'robots', content: environment.robots });
    if (!isDevMode()) {
      console.log = function () {};
      console.warn = function () {};
      console.error = function () {};
    }
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const lurl = sessionStorage.getItem('landing_url');
      if(!lurl) {
        sessionStorage.setItem('landing_url', this.document.defaultView.location.href)
      }
      /*localStorage.removeItem('landing_url');
      localStorage.setItem(
        'landing_url',
        this.document.defaultView.location.href
      );*/
      const user = await this.userService.getUser();
        if(user == null) {
          localStorage.removeItem('token');
        }
      // AOS.init();
      // await this.getWebsiteInfo();
    }
    setTimeout(() => this.router.initialNavigation());
  }

  async getWebsiteInfo(): Promise<void> {
    if (this.isBrowser) {
    const website = await this.webservice.getWebiteInfo().toPromise();

    if (website) {
      // // console.log(website);

        localStorage.setItem('sessiontoken', website.data.sessiontoken);

      }
    }
  }
}
