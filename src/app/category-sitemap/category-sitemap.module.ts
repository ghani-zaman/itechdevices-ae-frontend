import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorySitemapRoutingModule } from './category-sitemap-routing.module';
import { CatmapComponent } from './catmap/catmap.component';


@NgModule({
  declarations: [
    CatmapComponent
  ],
  imports: [
    CommonModule,
    CategorySitemapRoutingModule
  ]
})
export class CategorySitemapModule { }
