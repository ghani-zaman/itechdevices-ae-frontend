import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID, TemplateRef } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ComparelistService } from 'src/app/services/comparelist.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { WebsiteService } from 'src/app/services/website.service';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { bounceAnimation } from 'angular-animations';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
declare var jQuery: any;

@Component({
  selector: 'app-top-cart',
  templateUrl: './top-cart.component.html',
  styleUrls: ['./top-cart.component.css'],
  animations: [
    bounceAnimation({anchor: 'bounce'})
  ]
})
export class TopCartComponent implements OnInit {
  isBrowser = false;
  minicart: any = null;
  cart: any = null;
  total = 0;
  wtotal = 0;
  ctotal = 0;
  cloading = false;
  wloading = false;
  clloading = false;
  wishlist: any = null;
  comparelist: any = null;
  user: any;
  isLoggedIn = false;
  loggingOut = false;
  cartanimation = false;
  wishanimation = false;
  compareAnimation = false;
  model: any;
  collapsed = true;
  menuOpen: any = -1;
  menuOpenInner: any = -1;
  @Input() menu: any = null;
  @Input() treex: any  = null;
  tree: any = [{
    name: 'All Categories',
    childrens: []
  }];

  // tslint:disable-next-line:max-line-length
  constructor(
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId,
    private userService: UserService,
    private compare: ComparelistService,
    private wish: WishlistService,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private webservice: WebsiteService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    /*if(this.isBrowser){
    //this.getMenuItems();
    // this.getCategoryTree();
    }*/

  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
  openLink() {

  }

  toggleMenu(index): void{
    //console.log("Menu index: " + index);
    if(this.menuOpen == index){
      this.menuOpen = -1;
      return;
    }
    this.menuOpen = index;
  }

  toggleMenuInner(index): void{
    //console.log("Menu index: " + index);
    if(this.menuOpenInner == index){
      this.menuOpenInner = -1;
      return;
    }
    this.menuOpenInner = index;
  }

  cartAnimationDone(): void {
    this.cartanimation = false;
  }

  wishAnimationDone(): void {
    this.wishanimation = false;
  }
  compareAnimationDone(): void {
    this.compareAnimation = false;
  }

  async getCategoryTree(): Promise<void> {
    try {
      // const resp: any = await this.webservice.getCategoryTree().toPromise();
      const resp: any = [] ;// this.webservice.getCategoryTree();
      if (resp) {

        for (let i = 0; i < resp.data.length; i++) {
          this.tree[0].childrens = this.tree[0].childrens.concat(resp.data[i].childrens);
          // console.log(this.tree);
        }
        // this.tree = resp.data;
      }
    }
    catch (err) {
      this.tree = [{
        name: 'All Categories',
        childrens: []
      }];
    }
  }

  async getMenuItems(): Promise<void> {
    try {
     // const resp = await this.webservice.getWebsiteMenu().toPromise();
     const resp: any = []; //this.webservice.getWebsiteMenu();
      //console.log("Menu response")
      //console.log(resp);
      if (resp) {
        this.menu = resp.data;
        // console.log(this.menu);

      }
     }
    catch (err) {
      this.menu = [];
    }
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated();
    this.userService.loginFlag$.subscribe((data: any) => {
      this.isLoggedIn = data;
    });

    this.cartService.cartCount$.subscribe((data) => {
      this.total = data;
      this.cartanimation = true;
      this.getCartInfo();
    });

    /*this.wish.wishCount$.subscribe((data) => {
      this.wtotal = data;
      this.wishanimation = true;
      this.getListInfo();
    });*/
    /*this.compare.compareCount$.subscribe((data) => {
      this.ctotal = data;
      this.compareAnimation = true;
      this.getcListInfo();
    });*/
    if (this.isBrowser) {
      const sessiontoken = localStorage.getItem('sessiontoken');
      if (!sessiontoken) {
        await this.cartService.getWebsiteInfo();
      }
      this.minicart = await this.cartService.getCartList().toPromise();
      if (this.minicart) {
        this.cartService.calculateCartTotal();
      }
      this.tree[0].childrens = this.treex;
      if (this.isBrowser) {
      //this.getCartInfo();
      //this.getListInfo();
      //this.getcListInfo();

      }
    }

    if (this.isBrowser) {
      (function ($) {
        jQuery(document).ready(function () {

          // Category Dropdown
          jQuery(document).ready(() => {
            // jQuery('#mobileMenu').on('click', 'a.nav-link', function () {
            //   jQuery('#mobileCloseButton').click();
            // });
            jQuery(document).on('click', '#mobileMenu a.nav-link', function () {
              jQuery('#mobileCloseButton').click();
            });
            jQuery('#offcanvasNavbar').on('hidden.bs.offcanvas', function () {
              jQuery('.collapse').collapse('hide');
            });
          });

        });
      })(jQuery);
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

  async logout(): Promise<void> {
    try {
      this.loggingOut = true;
      const data = await this.userService.logout();
      this.router.navigate(['/user/login']);
      this.loggingOut = false;
    } catch (err) {
      this.loggingOut = false;
    }
  }

  async getListInfo(): Promise<void> {
    try {
      this.wloading = true;
      const cdata = await this.wish.getWishList('');
      if (cdata) {
        // // console.log(cdata);
        this.wishlist = cdata;
        this.wtotal = cdata.products.length;
        // this.wish.updateWishlist(cdata);
      }
      this.wloading = false;
    } catch (err) {
      this.wloading = false;
    }
  }
  async getcListInfo(): Promise<void> {
    try {
      this.clloading = true;
      const cdata = await this.compare.getCompareList();
      if (cdata) {
        // // console.log(cdata);
        this.comparelist = cdata;
        this.ctotal = cdata.products.length;
        // this.wish.updateWishlist(cdata);
      }
      this.clloading = false;
    } catch (err) {
      this.clloading = false;
    }
  }

  async getCartInfo(): Promise<void> {
    try {
      this.cloading = true;
      const cdata = await this.cartService.getFullcartList().toPromise();
      if (cdata) {
        // // console.log(cdata);
        this.cart = cdata.data;
      }
      this.cloading = false;
    } catch (err) {
      this.cloading = false;
    }
  }
}
