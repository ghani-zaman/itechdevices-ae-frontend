import { NgModule } from '@angular/core';


import { HomeRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../components/components.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // ComponentsModule,
  ]
})
export class HomeModule { }
