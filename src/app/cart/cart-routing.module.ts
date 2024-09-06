import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageNewComponent } from './cart-page-new/cart-page-new.component';

const routes: Routes = [
  {
    path: '',
    component: CartPageNewComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
