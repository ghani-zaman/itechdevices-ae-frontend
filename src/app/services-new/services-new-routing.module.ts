import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Service5Component } from './service5/service5.component';
import { Service1Component } from './service1/service1.component';
import { Service2Component } from './service2/service2.component';
import { Service3Component } from './service3/service3.component';
import { Service4Component } from './service4/service4.component';

const routes: Routes = [
  {
    path: 'cloud',
    component: Service1Component
  },
  {
    path: 'cybersecurity',
    component: Service2Component
  },
  {
    path: 'dev-ops',
    component: Service3Component
  },
  {
    path: 'managed-cloud',
    component: Service4Component
  },
  {
    path: 'managed-infrastructure',
    component: Service5Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesNewRoutingModule { }
