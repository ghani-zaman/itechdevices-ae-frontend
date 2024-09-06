import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ComponentsModule } from '../components/components.module';
import { StaticPagesRoutingModule } from './static-pages-routing.module';

import { ProductLineComponent } from './product-line/product-line.component';
import { ServicePageComponent } from './service-page/service-page.component';
// import { SharedModule } from '../shared.module';
import { OrdersComponent } from './orders/orders.component';
import { PowerSuppliesFeatured } from './power-supplies-featured/power-supplies-featured.component';
import { ServerHardDrivesFeatured } from './server-hard-drives-featured/server-hard-drives-featured.component';
import { RfqThankYou } from './rfq-thank-you/rfq-thank-you.component';
import { ContactThankYou } from './contact-thank-you/contact-thank-you.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';


@NgModule({
  declarations: [

    ProductLineComponent,
    ServicePageComponent,
    OrdersComponent,
    PowerSuppliesFeatured,
    ServerHardDrivesFeatured,
    RfqThankYou,
    ContactThankYou,
  ],
  imports: [
    CommonModule,
    /*ComponentsModule,*/
    StaticPagesRoutingModule,
    NgDynamicBreadcrumbModule
    /*SharedModule,*/
  ]
})
export class StaticPagesModule { }
