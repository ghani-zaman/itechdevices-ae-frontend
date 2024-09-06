import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebsiteService } from 'src/app/services/website.service';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-catmap',
  templateUrl: './catmap.component.html',
  styleUrls: ['./catmap.component.css'],

})
export class CatmapComponent implements OnInit {
  tree = [];
  constructor(
    private webservice: WebsiteService,
    private title: Title,
    private meta: Meta,
    private seo: SEOService
  ) {

  }
  ngOnInit(): void {
    this.getCategoryTree();
    const seoTitle = 'Sitemap | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Explore our comprehensive sitemap to easily navigate through a vast selection of IT hardware products. Find what you need quickly at Itech Devices!' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

  async getCategoryTree(): Promise<void> {
    try {
      const resp: any = await this.webservice.getCategoryTree().toPromise();
      //const resp: any = this.webservice.getCategoryTree();
      if (resp) {

        for(let i = 0; i<resp.data.length; i++) {
          this.tree = this.tree.concat(resp.data[i].childrens);
        }
         // this.tree = resp.data;
      }
      // console.log(this.tree);
     }
    catch (err) {
      this.tree = [];
    }
  }
}
