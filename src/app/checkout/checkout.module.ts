import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { OnePageCheckoutComponent } from './one-page-checkout/one-page-checkout.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaytraceComponent } from './paytrace/paytrace.component';
import { SimpleCheckoutNewComponent } from './simple-checkout-new/simple-checkout-new.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { BuyNowCtaComponent } from '../components/buy-now-cta/buy-now-cta.component';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    OnePageCheckoutComponent,
    PaytraceComponent,
    SimpleCheckoutNewComponent,
    OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
    ComponentsModule,
    PipesModule,
    SharedModule,
    NgSelectModule,
    NgxStripeModule,
    BuyNowCtaComponent
  ]
})
export class CheckoutModule { }
