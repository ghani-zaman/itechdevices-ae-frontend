import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishComponent } from './wish/wish.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    WishComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    WishComponent
  ]
})
export class WishlistModule { }
