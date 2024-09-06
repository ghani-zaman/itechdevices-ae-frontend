import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ProductTabsComponent } from './product-tabs/product-tabs.component';
import { DetailsComponent } from './details/details.component';
import { ProductRelatedComponent } from './product-related/product-related.component';
import { ProductIndustriesComponent } from './product-industries/product-industries.component';
import { ProductPrintComponent } from './product-print/product-print.component';


@NgModule({
  declarations: [

    ProductTabsComponent,
    ProductIndustriesComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule,
    ProductRelatedComponent,

  ]
})
export class ProductsModule { }
