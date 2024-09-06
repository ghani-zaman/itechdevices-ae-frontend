import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';

import { ProductLineComponent } from './product-line/product-line.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { OrdersComponent } from './orders/orders.component';
import { PowerSuppliesFeatured } from './power-supplies-featured/power-supplies-featured.component';
import { ServerHardDrivesFeatured } from './server-hard-drives-featured/server-hard-drives-featured.component';
import { AccountBenefitsComponent } from './account-benefits/account-benefits.component';
import { RfqThankYou } from './rfq-thank-you/rfq-thank-you.component';
import { ContactThankYou } from './contact-thank-you/contact-thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent
  },

  {
    path: 'product-line',
    component: ProductLineComponent,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Product Line',
          url: ''
        }
      ]
    }
  },

  {
    path: 'rfq-thank-you',
    component: RfqThankYou,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Rfq Thank You',
          url: ''
        }
      ]
    }
  },
  {
    path: 'contact-thank-you',
    component: ContactThankYou,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Contact Thank You',
          url: ''
        }
      ]
    }
  },



  {
    path: 'orders',
    component: OrdersComponent,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Orders',
          url: ''
        }
      ]
    }
  },










  {
    path: 'power-supplies-featured',
    component: PowerSuppliesFeatured,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Power Supplies Featured',
          url: ''
        }
      ]
    }
  },
  {
    path: 'server-hard-drives-featured',
    component: ServerHardDrivesFeatured,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Server Hard Drives Featured',
          url: ''
        }
      ]
    }
  },
  {
    path: 'service-page',
    component: ServicePageComponent,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Service',
          url: ''
        }
      ]
    }
  },
  {
    path: 'account-benefits',
    component: AccountBenefitsComponent,
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Account Benefits',
          url: ''
        }
      ]
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPagesRoutingModule { }
