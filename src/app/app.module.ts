import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions, withNoHttpTransferCache } from '@angular/platform-browser';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule, LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';

import { BlogService } from './services/blog.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyInterceptor } from './my.interceptor';
import { AuthGuard } from './auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { ThankYouComponent } from './static-pages/thank-you/thank-you.component';
import { register } from 'swiper/element/bundle';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
register();
@NgModule({
  declarations: [
    AppComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    LayoutModule,
    NgxSmartModalModule.forRoot(),
    ToastrModule.forRoot(),
    NgDynamicBreadcrumbModule,
    NgbModule,
    FooterComponent,
    NgxStripeModule.forRoot(environment.stripeKey),
  ],
  providers: [
    AuthGuard,
    BlogService,
    provideClientHydration(withHttpTransferCacheOptions({
      includePostRequests: false
    })),
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 0 } },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'AED ' },
    provideHttpClient(withFetch()),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        let url = config.src;

        return url;
      }
    },

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
