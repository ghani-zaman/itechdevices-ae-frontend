import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatmapComponent } from './catmap/catmap.component';

const routes: Routes = [
  {
    path: '',
    component: CatmapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorySitemapRoutingModule { }
