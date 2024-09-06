import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/page/page.component')
      .then(m => m.PageComponent),
      data: {
        title: 'Home',
        breadcrumb: [
          {
            label: 'Home',
            url: ''
          }
        ]
      },
  },
  {
    path: 'thank-you',
    loadComponent: () => import('./static-pages/thank-you/thank-you.component')
      .then(m => m.ThankYouComponent),
  },
  {
    path: 'return_policy',
    loadComponent: () => import('./static-pages/return-policy/return-policy.component').then(m => m.ReturnPolicyComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Return Policy',
          url: ''
        }
      ]
    }
  },
  {
    path: 'refund_policy',
    loadComponent: () => import('./static-pages/refund-policy/refund-policy.component').then(m => m.RefundPolicyComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Refund Policy',
          url: ''
        }
      ]
    }
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./static-pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Privacy Policy',
          url: ''
        }
      ]
    }
  },
  {
    path: 'rfq-form',
    loadComponent: () => import('./static-pages/rfq-form/rfq-form.component').then(m => m.RfqForm),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Rfq Form',
          url: ''
        }
      ]
    }
  },
  {
    path: 'part-number-identification',
    loadComponent: () => import('./static-pages/part-number-identification/part-number-identification.component').then(m => m.PartNumberIdentification),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Part Number Identification',
          url: ''
        }
      ]
    }
  },
  {
    path: 'shipping',
    loadComponent: () => import('./static-pages/shipping/shipping.component').then(m => m.Shipping),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Shipping',
          url: ''
        }
      ]
    }
  },
  {
    path: 'product-availability',
    loadComponent: () => import('./static-pages/product-availability/product-availability.component').then(m => m.ProductAvailability),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Product Availability',
          url: ''
        }
      ]
    }
  },
  {
    path: 'tax-exempt',
    loadComponent: () => import('./static-pages/tax-exempt/tax-exempt.component').then(m => m.TaxExempt),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Tax Exempt',
          url: ''
        }
      ]
    }
  },
  {
    path: 'sales-information',
    loadComponent: () => import('./static-pages/sales-information/sales-information.component').then(m => m.SalesInformation),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Sales Information',
          url: ''
        }
      ]
    }
  },
  {
    path: 'government-it-procurement',
    loadComponent: () => import('./static-pages/government-it-procurement/government-it-procurement.component').then(m => m.GovernmentItProcurement),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Government It Procurement',
          url: ''
        }
      ]
    }
  },
  {
    path: 'purchasing-for-educational-institutions',
    loadComponent: () => import('./static-pages/purchasing-for-educational-institutions/purchasing-for-educational-institutions.component').then(m => m.PurchasingForEducationalInstitutions),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Purchasing For Educational Institutions',
          url: ''
        }
      ]
    }
  },
  {
    path: 'preferred-partner-program',
    loadComponent: () => import('./static-pages/preferred-partner-program/preferred-partner-program.component').then(m => m.PreferredPartnerProgram),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Preferred Partner Program',
          url: ''
        }
      ]
    }
  },
  {
    path: 'product-certifications',
    loadComponent: () => import('./static-pages/product-certifications/product-certifications.component').then(m => m.ProductCertifications),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Product Certifications',
          url: ''
        }
      ]
    }
  },
  {
    path: 'payment-methods',
    loadComponent: () => import('./static-pages/payment-methods/payment-methods.component').then(m => m.PaymentMethods),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Payment Methods',
          url: ''
        }
      ]
    }
  },
  {
    path: 'about-us',
    loadComponent: () => import('./static-pages/about-us/about-us.component').then(m => m.AboutUsComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'About Us',
          url: ''
        }
      ]
    }
  },
  {
    path: 'faq',
    loadComponent: () => import('./static-pages/faq/faq.component').then(m => m.FaqComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Faq',
          url: ''
        }
      ]
    }
  },
  {
    path: 'warranty',
    loadComponent: () => import('./static-pages/warranty/warranty.component').then(m => m.WarrantyComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Warranty',
          url: ''
        }
      ]
    }
  },
  {
    path: 'terms',
    loadComponent: () => import('./static-pages/terms/terms.component').then(m => m.TermsComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Terms and Conditions',
          url: ''
        }
      ]
    }
  },
  {
    path: 'flash-deals',
    loadChildren: () => import('./search/search.module')
      .then(m => m.SearchModule),
  },
  {
    path: 'dummy',
    loadChildren: () => import('./dummy/dummy.module')
      .then(m => m.DummyModule),
  },
  {
    path: 'compare',
    loadChildren: () => import('./compare/compare.module')
      .then(m => m.CompareModule),
      data: {
        title: 'Cart',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Compare',
            url: '/compare'
          }
        ]
      },
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module')
      .then(m => m.CartModule),
    data: {
        title: 'Cart',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Cart',
            url: '/cart'
          }
        ]
      },
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule),
      data: {
        title: 'User',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'User',
            url: '/user'
          }
        ]
      },
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module')
      .then(m => m.WishlistModule),
      data: {
        title: 'Whishlist',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Whishlist',
            url: '/whistlist'
          }
        ]
      },
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module')
      .then(m => m.CheckoutModule),
      data: {
        title: 'Checkout',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Cart',
            url: '/cart'
          }
          ,
          {
            label: 'Checkout',
            url: '/checkout'
          }
        ]
      },
  },
  {
    path: 'industry',
    loadChildren: () => import('./industry/industry.module')
      .then(m => m.IndustryModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./services-new/services-new.module')
      .then(m => m.ServicesNewModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module')
      .then(m => m.BlogModule),
  },

  {
    path: 'category/:url',
    loadChildren: () => import('./category/category.module')
      .then(m => m.CategoryModule),
  },
  {
    path: 'brand',
    loadChildren: () => import('./brand/brand.module')
      .then(m => m.BrandModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./category/category.module')
      .then(m => m.CategoryModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./static-pages/static-pages.module')
      .then(m => m.StaticPagesModule),
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./static-pages/contact-us/contact-us.component')
      .then(m => m.ContactUsComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Contact Us',
          url: ''
        }
      ]
    }
  },
  {
    path: 'rma-form',
    loadComponent: () => import('./static-pages/rma-form/rma-form.component')
      .then(m => m.RmaFormComponent),
    data: {
      title: 'Pages',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'RMA Form',
          url: ''
        }
      ]
    }
  },
  {
    path: 'category-sitemap',
    loadChildren: () => import('./category-sitemap/category-sitemap.module')
      .then(m => m.CategorySitemapModule),
  },
  {
    path: 'errors',
    loadChildren: () => import('./errors/errors.module')
      .then(m => m.ErrorsModule),
  },
  {
    path: 'search/model/:keyword',
    loadChildren: () => import('./search/search.module')
      .then(m => m.SearchModule),
  },
  {
    path: 'search/:keyword',
    loadChildren: () => import('./search/search.module')
      .then(m => m.SearchModule),
      data: {
        title: 'Search',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Search',
            url: ''
          },
          {
            label: '{{keyword}}',
            url: '/search/:keyword'
          }
        ]

      }
  },
  {
    path: 'categories.html',
    loadChildren: () => import('./search/search.module')
      .then(m => m.SearchModule),
      data: {
        title: 'All Categories',
        breadcrumb: [
          {
            label: 'Home',
            url: '/'
          },
          {
            label: 'Categories',
            url: ''
          }
        ]

      }
  },
  {
    path: ':url',

    loadComponent: () => import('./products/details/details.component')
      .then(m => m.DetailsComponent),
  },
  { path: '**', redirectTo: '/errors/not-found.html', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'disabled',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
