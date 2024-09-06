import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRoutingModule } from './brand-routing.module';
import { SharedModule } from '../shared.module';
import { ComponentsModule } from '../components/components.module';
import { ListingComponent } from './listing/listing.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [ListingComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule,
    ComponentsModule,
    LazyLoadImageModule
  ]
})
export class BrandModule { }
