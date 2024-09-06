import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareRoutingModule } from './compare-routing.module';
import { CompareListComponent } from './compare-list/compare-list.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    CompareListComponent
  ],
  imports: [
    CommonModule,
    CompareRoutingModule,
    ComponentsModule,
    SharedModule,
    PipesModule
  ]
})
export class CompareModule { }
