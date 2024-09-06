import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DummyRoutingModule } from './dummy-routing.module';
import { DummyPageComponent } from './dummy-page/dummy-page.component';
import { DummyDemoComponent } from './dummy-demo/dummy-demo.component';


@NgModule({
  declarations: [
    DummyPageComponent,
    DummyDemoComponent
  ],
  imports: [
    CommonModule,
    DummyRoutingModule
  ]
})
export class DummyModule { }
