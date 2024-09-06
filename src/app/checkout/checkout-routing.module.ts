import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaytraceComponent } from './paytrace/paytrace.component';
import { SimpleCheckoutNewComponent } from './simple-checkout-new/simple-checkout-new.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleCheckoutNewComponent
  },
  {
    path: 'order-success.html',
    component: OrderSuccessComponent
  },
  {
    path: 'payment/:id',
    component: PaytraceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
