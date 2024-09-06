import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { ListingComponent } from './listing/listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    ListingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    NgxPaginationModule,
    ComponentsModule
  ]
})
export class SearchModule { }
