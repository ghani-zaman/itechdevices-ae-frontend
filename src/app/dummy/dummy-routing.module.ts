import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyPageComponent } from './dummy-page/dummy-page.component';

const routes: Routes = [
  {
    path: '',
    component: DummyPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DummyRoutingModule { }
