import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../shared.module';
import { ComponentsModule } from '../components/components.module';
import { ListingComponent } from './listing/listing.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [ListingComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    ComponentsModule,
    LazyLoadImageModule,
    PipesModule
  ]
})
export class CategoryModule { }
