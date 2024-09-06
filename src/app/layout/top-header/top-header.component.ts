import { Component, Inject, OnInit, PLATFORM_ID, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css'],
})
export class TopHeaderComponent implements OnInit {
  collapsed = true;
  menuOpen = false;
  checkout = false;
  isLoggedIn = false;
  tree = [];
  menu = [];
  isBrowser = false;
  constructor(
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private userService: UserService,
    private webservice: WebsiteService,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const isCheckout = event.url.indexOf('checkout') > -1 ? true : false;
        this.checkout = isCheckout;
      });

      //this.getMenuItems();
      //this.getCategoryTree();
  }

  async getMenuItems(): Promise<void> {
    try {
      // const resp = await this.webservice.getWebsiteMenu().toPromise();
      const resp: any = this.webservice.getWebsiteMenu();
      if (resp) {
        this.menu = resp.data;
      }
    } catch (err) {
      this.menu = [];
    }
  }

  async getCategoryTree(): Promise<void> {
    try {
      // const resp$: any = this.webservice.getCategoryTree();
      // const resp: any = this.webservice.getCategoryTree();
      this.tree = []; //resp.data; // [];
      // console.log('resp', resp);
      /*if (resp) {
        for (let i = 0; i < resp.data.length; i++) {
          // console.log(resp.data[i])
          this.tree = this.tree.concat(resp.data[i]?.childrens);
        }
      }
      console.log(this.tree);*/
    } catch (err) {
      // console.log('err',err);
      this.tree = [];
    }
  }

  async isAuthenticated(): Promise<void> {
    try {
      if (await this.userService.isAuthenticated()) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    } catch (err) {
      this.isLoggedIn = false;
    }
  }

  openEnd(content: TemplateRef<any>): any {
    this.offcanvasService.open(content, { position: 'end' });
  }

  openMenu(): any {
    if (this.menuOpen) {
      this.menuOpen = false;
    } else {
      this.menuOpen = true;
    }
  }

  ngOnInit(): void {
    this.isAuthenticated();
    this.userService.loginFlag$.subscribe((data: any) => {
      this.isLoggedIn = data;
    });
    //if(isPlatformBrowser(this.platformId)){
   // }


  }
}
