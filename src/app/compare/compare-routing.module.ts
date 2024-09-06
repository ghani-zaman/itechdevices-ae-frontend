import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareListComponent } from './compare-list/compare-list.component';

const routes: Routes = [
  {
    path: '',
    component: CompareListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareRoutingModule { }
