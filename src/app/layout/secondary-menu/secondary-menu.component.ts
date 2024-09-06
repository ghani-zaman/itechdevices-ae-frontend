import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from 'src/app/services/website.service';
declare var jQuery: any;

@Component({
  selector: 'app-secondary-menu',
  templateUrl: './secondary-menu.component.html',
  styleUrls: ['./secondary-menu.component.css']
})
export class SecondaryMenuComponent implements OnInit {

  menuOpen: any = -1;
  menu = [];
  collapsed = true;

  constructor(private webservice: WebsiteService, private router: Router) { }

  ngOnInit(): void {
    // this.getMenuItems();
  }

  toggleMenu(index): void{
    if(this.menuOpen == index){
      this.menuOpen = -1;
      return;
    }
    this.menuOpen = index;
  }

  navigateTo(url): void {
    // this.router.navigateByUrl(url);
    this.menuOpen = -1;

  }
  async getMenuItems(): Promise<void> {
    try {
      // const resp = await this.webservice.getWebsiteMenu().toPromise();
      const resp: any = this.webservice.getWebsiteMenu();
      if (resp) {
        this.menu = resp.data;
      }
     }
    catch (err) {
      this.menu = [];
    }
  }
}
