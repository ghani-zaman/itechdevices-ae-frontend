import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartPageNewComponent } from './cart-page-new/cart-page-new.component';


@NgModule({
  declarations: [
    CartPageComponent,
    CartPageNewComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ]
})
export class CartModule { }
