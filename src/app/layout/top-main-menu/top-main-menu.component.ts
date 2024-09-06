import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { WebsiteService } from 'src/app/services/website.service';
declare var jQuery: any;
@Component({
  selector: 'app-top-main-menu',
  templateUrl: './top-main-menu.component.html',
  styleUrls: ['./top-main-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class TopMainMenuComponent implements OnInit, OnDestroy {
  @Input() menu = null;
  collapsed = true;
  menuOpen = false;
  @Input() tree = null;

  menuOpenx: any = -1;
  @Input() menux = null;
  collapsedx = true;
  onMenu = false;
  onBox = true;
  isBrowser = false;
  private debounceSubject = new Subject<void>();
  private debounceSubscription: Subscription;
  constructor(
    private webservice: WebsiteService,
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    @Inject(PLATFORM_ID) private platformId
  ) {
    // this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // console.log(this.tree);
    if (this.isBrowser) {
      //this.getMenuItems();
      //this.getCategoryTree();
      //this.getMenuItemsx();
      // console.log(this.tree);
      // (function ($) {
      //   $(document).ready(function () {
      //     jQuery(document).ready(() => {
      //       jQuery('.menu-item-big').hover(function () {
      //         var isHovered = jQuery(this).is(':hover');
      //         if (isHovered) {
      //           jQuery(this).children('ul').stop().slideDown(300);
      //         } else {
      //           jQuery(this).children('ul').stop().slideUp(300);
      //         }
      //       });
      //     });

      //     jQuery(document).on('click', '.bottom-menu  a', function () {
      //       // this.onMenu = false;
      //       // this.onBox = false;
      //       if (!this.onMenu && !this.onBox) {
      //         jQuery('.subMenu').slideUp(300);
      //         jQuery('.drop-down-ul').hide();
      //         this.menuOpenx = -1;
      //         this.menuOpen = -1;
      //       }
      //     });
      //   });
      // })(jQuery);
      (function ($) {
        $(document).ready(function () {
          // Hide SubMenus.
          $('.subMenu').hide();

          // Shows SubMenu when it's parent is hovered.
          $('.subMenu')
            .parent('li')
            .hover(function () {
              $(this).find('>.subMenu').not(':animated').slideDown(300);
              $(this).toggleClass('active ');
            });

          // Hides SubMenu when mouse leaves the zone.
          $('.subMenu')
            .parent('li')
            .mouseleave(function () {
              $(this).find('>.subMenu').slideUp(150);
            });
        });
      })(jQuery);
    }
   /* this.debounceSubscription = this.debounceSubject
      .pipe(
        debounceTime(500), // Set the debounce time to 2000 milliseconds (2 seconds)
        switchMap((j) => {
          if (this.onMenu) {
            this.openmenu(j);
          }

          return new Observable((observer) => {
            observer.next();
            observer.complete();
          });
        })
      )
      .subscribe();*/
  }

  /*openEnd(content: TemplateRef<any>): any {
    this.offcanvasService.open(content, { position: 'end' });
  }

  openMenu(): any {
    if (this.menuOpen) {
      this.menuOpen = false;
    } else {
      this.menuOpen = true;
    }
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
      // const resp: any = await this.webservice.getCategoryTree().toPromise();
      const resp: any = this.webservice.getCategoryTree();
      if (resp) {
        for (let i = 0; i < resp.data.length; i++) {
          this.tree = this.tree.concat(resp.data[i].childrens);
        }
        // this.tree = resp.data;
      }
    } catch (err) {
      this.tree = [];
    }
  }

  async openCategory(item): Promise<void> {
    this.router.navigate(['/categories/' + item.url]);

  }

  toggleMenux(index): void {
    if (this.menuOpenx == index) {
      jQuery('.subMenu').slideUp(300);
      this.menuOpenx = -1;

      return;
    }
    this.menuOpenx = index;
    jQuery('.subMenu:not(#myData' + index + ')').slideUp(300, function () {
      jQuery('#myData' + index).slideDown(300);
    });
  }

  navigateTox(url): void {
    // this.router.navigateByUrl(url);
    jQuery('.subMenu').slideUp(300);
    this.menuOpenx = -1;
  }

  openmenu(index): void {
    jQuery('.subMenu:not(#myData' + index + ')').slideUp(300, function () {
      jQuery('#myData' + index).slideDown(300);
    });

    this.menuOpenx = index;
  }

  closemenu(): void {
    if (!this.onMenu && !this.onBox) {
      jQuery('.subMenu').slideUp(300);
      this.menuOpenx = -1;
    }
  }
  async getMenuItemsx(): Promise<void> {
    try {
      // const resp = await this.webservice.getWebsiteMenu().toPromise();
      const resp: any = this.webservice.getWebsiteMenu();
      if (resp) {
        this.menux = resp.data;
      }
    } catch (err) {
      this.menux = [];
    }
  }*/
  ngOnDestroy() {

  }
  debounce(j) {
    //this.debounceSubject.next(j);
  }
}
