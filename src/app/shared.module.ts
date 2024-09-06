import { Injectable, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Attributes, IntersectionObserverHooks, LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { NgxBarcode6Module } from 'ngx-barcode6';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Injectable()
class LazyLoadImageHooks extends IntersectionObserverHooks {
  // tslint:disable-next-line:typedef
  setup(attributes: Attributes) {
    // Overwride the path to the default image for all lazyloaded images
    attributes.defaultImagePath = '/assets/images/img-loader.svg';
    attributes.errorImagePath = '/assets/images/no-image.webp';
    // You can always call the base `setup` if you want to keep the default behavior
    super.setup(attributes);
  }
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    NgxPaginationModule,
    NgbModule,
    //NgxBarcode6Module,
    NgDynamicBreadcrumbModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RxFor,
    RxIf,
    NgOptimizedImage,

  ],
  exports: [
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    //NgxBarcode6Module,
    NgDynamicBreadcrumbModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RxFor,
    RxIf,
    NgOptimizedImage,

  ],
  providers: [
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks },
  ]
})
export class SharedModule { }
