import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesNewRoutingModule } from './services-new-routing.module';
import { Service5Component } from './service5/service5.component';
import { SharedModule } from '../shared.module';
import { ComponentsModule } from '../components/components.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Service1Component } from './service1/service1.component';
import { Service2Component } from './service2/service2.component';
import { Service3Component } from './service3/service3.component';
import { Service4Component } from './service4/service4.component';


@NgModule({
  declarations: [
    Service5Component,
    Service1Component,
    Service2Component,
    Service3Component,
    Service4Component
  ],
  imports: [
    CommonModule,
    ServicesNewRoutingModule,
    SharedModule,
    ComponentsModule,
    // PipesModule,
    LazyLoadImageModule
  ]
})
export class ServicesNewModule { }
