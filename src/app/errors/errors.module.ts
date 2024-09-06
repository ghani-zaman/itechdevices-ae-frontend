import { ProductCarouselComponent } from './../components/product-carousel/product-carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared.module';
import { RedirectPermanentComponent } from './redirect-permanent/redirect-permanent.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    RedirectPermanentComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    SharedModule,
    ProductCarouselComponent
  ],
  exports: [
    NotFoundComponent
  ]
})
export class ErrorsModule { }
