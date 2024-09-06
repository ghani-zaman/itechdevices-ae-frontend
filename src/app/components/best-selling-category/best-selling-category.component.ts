import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-best-selling-category',
  templateUrl: './best-selling-category.component.html',
  styleUrls: ['./best-selling-category.component.sass']
})
export class BestSellingCategoryComponent implements OnInit {

  activeTab = 0;
  data: any = [];
  loading = false;
  lineItems = {
    0: {
        items: 1
    },
    576: {
        items: 2
    },
    768: {
        items: 2
    },
    992: {
        items: 3
    },
    1000: {
        items: 4
    }
};
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor(
    private websiteService: WebsiteService
  ) { }

  // tslint:disable-next-line:typedef
  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
    this.activeTab = tabId;
  }

  ngOnInit(): void {
    this.getTopSellingCategories();
  }

  async getTopSellingCategories(): Promise<void> {
    try {
      this.loading = true;
      this.data = await this.websiteService.getTopSellingCategories();
      if (!this.data) {
        this.data = [];
      }
      this.loading = false;
    }catch (err) {
      this.data = [];
      this.loading = false;
    }
  }

}
